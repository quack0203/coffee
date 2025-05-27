// js/form-handler.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('offerForm');
  
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
  
      const data = new FormData(form);
      data.set('_subject', '新的折扣碼報名');
  
      try {
        const resp = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        const json = await resp.json();
  
        if (resp.ok) {
          form.reset();
          // Bootstrap 4 的 Modal 顯示／隱藏
          $('#thankYouModal').modal('show');
          setTimeout(() => $('#thankYouModal').modal('hide'), 3000);
        } else {
          alert(json.error || '送出失敗，請稍後再試');
        }
      } catch (err) {
        console.error(err);
        alert('連線錯誤，請稍後再試');
      }
    });
  });
  