document.querySelector('form').addEventListener('submit', (e) => {
    const title = document.querySelector('[name="title"]').value.trim();
    if (!title) {
      e.preventDefault();
      alert('Hobby name is required!');
    }
  });