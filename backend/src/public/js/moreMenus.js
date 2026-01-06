document.addEventListener('click', (e) => {
  // Lógica para abrir/fechar o menu
  if (e.target.classList.contains('activity-more')) {
    const menu = e.target.nextElementSibling;

    document.querySelectorAll('.activity-options-menu').forEach(m => {
      if (m !== menu) m.classList.add('hidden');
    });
    
    menu.classList.toggle('hidden');
    return;
  }

  // Fecha o menu se clicar em qualquer outro lugar da tela
  if (!e.target.closest('.more-menu-container')) {
    document.querySelectorAll('.activity-options-menu').forEach(m => m.classList.add('hidden'));
  }

  if (e.target.classList.contains('btn-delete')) {
    const row = e.target.closest('.activity-row');
    const dayId = row.dataset.dayId;
    const activityId = row.dataset.activityId;

    if (confirm("Tem certeza que deseja deletar esta atividade?")) {
      deleteActivity(dayId, activityId, row);
    }
  }
});

async function deleteActivity(dayId, activityId, rowElement) {
  try {
    const response = await fetch(`/days/${dayId}/activities/${activityId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      rowElement.style.opacity = '0';
      setTimeout(() => rowElement.remove(), 300);
    } else {
      alert("Erro ao deletar atividade");
    }
  } catch (err) {
    console.error("Erro na requisição delete:", err);
  }
}