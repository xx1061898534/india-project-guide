for (const group of document.querySelectorAll('[data-group]')) {
  const boxes = [...group.querySelectorAll('input[type="checkbox"]')]
  const count = group.querySelector('[data-count]')
  const reset = group.querySelector('[data-reset]')
  const key = 'india-guide-v3:' + group.dataset.group
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]')
    if (Array.isArray(saved)) {
      for (const box of boxes) box.checked = saved.includes(box.id)
    }
  } catch {
    // The checklist remains usable when browser storage is unavailable.
  }
  function update(save) {
    const checked = boxes.filter(box => box.checked).map(box => box.id)
    count.textContent = '已完成 ' + checked.length + ' / ' + boxes.length
    reset.disabled = checked.length === 0
    if (save) {
      try {
        localStorage.setItem(key, JSON.stringify(checked))
      } catch {
        count.textContent += '（进度仅保留在当前页面）'
      }
    }
  }
  reset.hidden = false
  update(false)
  group.addEventListener('change', () => update(true))
  reset.addEventListener('click', () => {
    for (const box of boxes) box.checked = false
    update(true)
  })
}
