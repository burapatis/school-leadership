/* ============================================================
   ศูนย์วิชาชีพผู้บริหารสถานศึกษาไทย — สคริปต์ร่วมทุกหน้า
   ============================================================ */

/* ---------- เมนูมือถือ ---------- */
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

/* ---------- แท็บมาตรฐานวิชาชีพ ---------- */
document.querySelectorAll('.tab').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab)?.classList.add('active');
  });
});

/* ---------- แบบประเมินสมรรถนะ 3 ด้าน (หน้า development.html) ----------
   ประมวลผลบนเครื่องผู้ใช้ทั้งหมด ไม่ส่งข้อมูลออกภายนอก */
document.getElementById('assessForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const result = document.getElementById('assessResult');
  const domains = [...e.currentTarget.querySelectorAll('fieldset')].map((fs) => {
    const vals = [...fs.querySelectorAll('input[type="range"]')].map((i) => Number(i.value));
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    return { name: fs.dataset.domain, avg };
  });
  const overall = domains.reduce((a, d) => a + d.avg, 0) / domains.length;
  const weakest = domains.reduce((a, d) => (d.avg < a.avg ? d : a), domains[0]);

  let level, advice;
  if (overall >= 4.2) {
    level = 'ระดับสะท้อนตนเองสูง';
    advice = 'ควรพัฒนาต่อสู่บทบาทพี่เลี้ยง ถ่ายทอดกรณีศึกษา และสร้างผู้นำทางวิชาการรุ่นใหม่ในสถานศึกษา';
  } else if (overall >= 3) {
    level = 'ระดับกำลังพัฒนา';
    advice = 'ควรเลือกด้านที่คะแนนต่ำสุดเป็นจุดคานงัด แล้วตั้งเป้าหมายพฤติกรรมที่สังเกตได้ในวงรอบ 30 วัน';
  } else {
    level = 'ระดับเริ่มต้น';
    advice = 'ควรเริ่มจากการอ่านมาตรฐานวิชาชีพและจรรยาบรรณอย่างละเอียด แล้วจัดทำแผนพัฒนาตนเองรายสัปดาห์ร่วมกับพี่เลี้ยง';
  }

  const bars = domains
    .map(
      (d) => `<p><strong>${d.name}</strong> — เฉลี่ย ${d.avg.toFixed(1)} / 5</p>
      <div class="bar" role="img" aria-label="${d.name} ${d.avg.toFixed(1)} จาก 5"><i style="width:${(d.avg / 5) * 100}%"></i></div>`
    )
    .join('');

  result.style.display = 'block';
  result.innerHTML = `
    <h3>${level} — คะแนนรวมเฉลี่ย ${overall.toFixed(1)} / 5</h3>
    ${bars}
    <p><strong>ข้อเสนอแนะ:</strong> ${advice}</p>
    <p><strong>จุดคานงัดที่แนะนำ:</strong> ${weakest.name} (เฉลี่ย ${weakest.avg.toFixed(1)}) —
    ดูแนวทางตั้งเป้า 30–90 วันในส่วน “จากผลประเมินสู่แผนพัฒนารายบุคคล” ด้านล่าง</p>`;
  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

/* ---------- คลังกรณีศึกษา: ตัวกรองหมวด + ค้นหา (หน้า cases.html) ---------- */
const caseGrid = document.getElementById('caseGrid');
if (caseGrid) {
  const chips = document.querySelectorAll('.chip');
  const search = document.getElementById('caseSearch');
  const empty = document.getElementById('caseEmpty');
  const cards = [...caseGrid.querySelectorAll('.case')];
  let activeCat = 'all';

  function applyFilter() {
    const q = (search?.value || '').trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const matchCat = activeCat === 'all' || card.dataset.cat === activeCat;
      const matchText = !q || card.textContent.toLowerCase().includes(q);
      const show = matchCat && matchText;
      card.hidden = !show;
      if (show) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeCat = chip.dataset.filter;
      applyFilter();
    });
  });
  search?.addEventListener('input', applyFilter);
}
