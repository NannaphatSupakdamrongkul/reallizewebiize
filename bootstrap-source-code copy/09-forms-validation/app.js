// ตัวอย่าง Custom Validation ตามแนวทาง Bootstrap
// หมายเหตุ: ระบบจริงต้องตรวจข้อมูลที่ Server ซ้ำเสมอ
const forms = document.querySelectorAll('.needs-validation');

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();

      // ย้าย focus ไป field แรกที่ผิด เพื่อให้ Keyboard user แก้ได้เร็ว
      form.querySelector(':invalid')?.focus();
    } else {
      event.preventDefault();
      alert('ตัวอย่าง: ข้อมูลผ่าน Client-side Validation แล้ว');
    }

    form.classList.add('was-validated');
  });
});

