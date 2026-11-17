const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 9000;

// ตั้งค่า View Engine และ Static Files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ตั้งค่า Session
app.use(
  session({
    secret: "riize_super_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// ตั้งค่า Transport แบบ Stream (Timeout บน Cloud)
const transporter = nodemailer.createTransport({
  streamTransport: true,
  newline: 'unix',
  buffer: true
});

// Middleware: ตรวจสอบการเข้าสู่ระบบ (บังคับว่าต้อง Login ก่อนถึงจะดูหน้าเว็บได้)
function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
}

// --- ROUTES ---
// ฟังก์ชันดึงวันที่ปัจจุบันตามโซนเวลา Asia/Bangkok 
function getBangkokDate() {
  const options = { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' };
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  return formatter.format(new Date());
}

// 1. หน้าแรก (ต้อง Login ก่อน พร้อมระบบ Visitor Counter)[cite: 1]
app.get("/", checkAuth, async (req, res) => {
  try {
    // ดึง IP address ของผู้เข้าชม (รองรับทั้ง Local และ Proxy/Cloud)[cite: 1]
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0].trim();
    }
    if (ip && ip.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    }

    const today = getBangkokDate();

    // บันทึกสถิติ: ถ้า IP 
    await pool.query(
      `INSERT INTO visitors (ip_address, visit_date, last_visited_at) 
       VALUES (?, ?, NOW()) 
       ON DUPLICATE KEY UPDATE last_visited_at = NOW()`,
      [ip, today]
    );

    // ดึงจำนวนผู้เข้าชมทั้งหมดมาแสดงผล[cite: 1]
    const [visitorRows] = await pool.query("SELECT COUNT(*) AS total_visitors FROM visitors");
    const totalVisitors = visitorRows[0].total_visitors;

    // ดึงข้อมูลกิจกรรมตามปกติ
    const [rows] = await pool.query("SELECT * FROM activities");
    
    res.render("index", { 
      user: req.session.user, 
      activities: rows, 
      totalVisitors: totalVisitors 
    });

  } catch (err) {
    console.error("Visitor Counter Error:", err);
    const [rows] = await pool.query("SELECT * FROM activities").catch(() => [[]]);
    res.render("index", { user: req.session.user, activities: rows, totalVisitors: 0 });
  }
});

// 2. หน้าสมาชิก (ต้อง Login)
app.get("/members", checkAuth, (req, res) => {
  res.render("members", { user: req.session.user });
});

// 3. หน้าผลงานเพลง (ต้อง Login)
app.get("/discography", checkAuth, (req, res) => {
  res.render("discography", { user: req.session.user });
});

// 4. หน้าแกลเลอรี (ต้อง Login)
app.get("/gallery", checkAuth, (req, res) => {
  res.render("gallery", { user: req.session.user });
});

// 5. หน้าสมัครสมาชิก 
app.get("/register", (req, res) => {
  res.render("register", { user: req.session.user, error: null });
});

// 6. ประมวลผลการสมัครสมาชิก 
app.post("/register", async (req, res) => {
  const { fullname, email, password, bias, message } = req.body;
  try {
    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.render("register", { user: null, error: "อีเมลนี้ถูกใช้งานไปแล้ว กรุณาใช้อีเมลอื่น" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (fullname, email, password, bias) VALUES (?, ?, ?, ?)",
      [fullname, email, hashedPassword, bias]
    );

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("register", { user: null, error: "เกิดข้อผิดพลาดในการสมัครสมาชิก" });
  }
});

// 7. หน้าเข้าสู่ระบบ 
app.get("/login", (req, res) => {
  res.render("login", { user: req.session.user, error: null });
});

// 8. ประมวลผลการเข้าสู่ระบบ (POST)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.render("login", { user: null, error: "ไม่พบอีเมลนี้ในระบบ" });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("login", { user: null, error: "รหัสผ่านไม่ถูกต้อง" });
    }

    req.session.user = { id: user.id, fullname: user.fullname, email: user.email };
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("login", { user: null, error: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
  }
});

// 9. หน้าขอลืมรหัสผ่าน 
app.get("/forgot-password", (req, res) => {
  res.render("login_forget", { error: null, success: null });
});

// 10. ประมวลผลส่งอีเมลรีเซ็ต  
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.render("login_forget", { error: "ไม่พบอีเมลนี้ในระบบ", success: null });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || "admin@riize.com",
      to: email,
      subject: "รีเซ็ตรหัสผ่านเว็บไซต์ RIIZE Fan Hub",
      text: "สวัสดีค่ะ/ครับ คุณได้ขอรีเซ็ตรหัสผ่านสำหรับเว็บไซต์ RIIZE กรุณาติดต่อผู้ดูแลระบบเพื่อตั้งรหัสผ่านใหม่",
    };
    
    await transporter.sendMail(mailOptions);

    res.render("login_forget", { error: null, success: "ระบบได้ส่งอีเมลแจ้งเตือนไปที่ " + email + " เรียบร้อยแล้ว" });
  } catch (err) {
    console.error(err);
    res.render("login_forget", { error: "เกิดข้อผิดพลาดในการส่งอีเมล", success: null });
  }
});

// 11. ออกจากระบบ (Logout)
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// รันเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});