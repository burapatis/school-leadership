# ศูนย์วิชาชีพผู้บริหารสถานศึกษาไทย

เว็บไซต์ Static หลายหน้า ครบ 8 หมวด สำหรับยกระดับมาตรฐาน อุดมการณ์ และความเชื่อถือศรัทธาต่อวิชาชีพผู้บริหารสถานศึกษา สร้างด้วย [Hugo](https://gohugo.io/) และเผยแพร่ภายใต้สัญญาอนุญาต [CC BY-SA 4.0](LICENSE)

## โครงสร้างหน้า

| หน้า | หมวด | บทบาท |
| --- | --- | --- |
| `/` | หน้าแรก | สร้างอุดมการณ์ ภาพลักษณ์ และความศรัทธาต่อวิชาชีพ |
| `/standards/` | มาตรฐานวิชาชีพ | สรุปข้อบังคับ/ประกาศ/กฎหมาย + แผนที่กฎหมาย + เทียบกรอบสากล |
| `/ethics/` | จรรยาบรรณ | จรรยาบรรณ 5 หมวด + กรอบตัดสินใจเชิงจริยธรรม 5 ขั้น |
| `/pathway/` | เส้นทางสู่ผู้บริหาร | ภาพรวมเส้นทาง คุณสมบัติ และคำถามก่อนตัดสินใจ |
| `/development/` | พัฒนาผู้บริหาร | โมดูลหลักสูตร แบบประเมินสมรรถนะ 12 ข้อ 3 ด้าน และแนวทาง IDP |
| `/cases/` | คลังกรณีศึกษา | กรณีศึกษา 10 เรื่อง 5 หมวด พร้อมตัวกรองและช่องค้นหา |
| `/trust/` | ศรัทธาสังคม | สื่อสารคุณค่าวิชาชีพต่อผู้ปกครอง ชุมชน และประชาชน |
| `/resources/` | แหล่งอ้างอิง | รวมกฎหมาย มาตรฐาน และเอกสารสากล |
| `/about/` | เกี่ยวกับศูนย์ | วัตถุประสงค์ ขอบเขต และสัญญาอนุญาต |

## โครงสร้างโปรเจ็กต์

```
school-leadership/
├── hugo.toml              # ค่าตั้งเว็บ
├── content/               # เนื้อหา Markdown (8 หมวด + about)
├── layouts/               # เทมเพลต HTML (header, footer, SEO)
├── assets/css/styles.css  # สไตล์ชีตหลัก
├── assets/js/script.js    # เมนูมือถือ, แท็บ, แบบประเมิน, ตัวกรองกรณีศึกษา
├── data/cases.yaml        # ข้อมูลกรณีศึกษา 10 เรื่อง
├── static/                # favicon, OG image, web manifest
└── legacy/                # ไฟล์เว็บต้นแบบเดิม (Python build)
```

## การพัฒนาในเครื่อง

ต้องติดตั้ง [Hugo Extended](https://gohugo.io/installation/) และ [Node.js](https://nodejs.org/) ก่อน

```bash
# ติดตั้ง Pagefind (ครั้งแรก)
npm install

# รันเซิร์ฟเวอร์พัฒนา (http://localhost:1313) — ค้นหาทั้งเว็บยังไม่พร้อมจนกว่าจะ build
hugo server -D
# หรือ
npm run dev

# สร้างไฟล์ static + ดัชนีค้นหา Pagefind
npm run build
```

## การนำขึ้น GitHub Pages

1. สร้าง repository ชื่อ `school-leadership` บน GitHub
2. Push โค้ดขึ้น branch `main`
3. ไปที่ **Settings → Pages → Build and deployment** เลือก **GitHub Actions**
4. Workflow `.github/workflows/deploy.yml` จะ build และ deploy อัตโนมัติเมื่อ push

เว็บจะอยู่ที่ `https://<username>.github.io/school-leadership/`

> หมายเหตุ: แก้ `baseURL` ใน `hugo.toml` ให้ตรงกับ GitHub username ของคุณ หรือปล่อยให้ GitHub Actions กำหนดตอน build

## มาตรฐานที่รองรับ

- SEO: canonical URL, Open Graph, Twitter Cards, sitemap.xml, robots.txt
- Structured Data: Schema.org (WebSite, Organization, WebPage, BreadcrumbList)
- Accessibility: skip-link, aria labels, WAI-ARIA tabs, reduced motion
- ค้นหาทั้งเว็บ: [Pagefind](https://pagefind.app/) (client-side, กด `⌘K` / `Ctrl+K`)
- Breadcrumb navigation ทุกหน้าย่อย
- Print stylesheet สำหรับพิมพ์มาตรฐาน/จรรยาบรรณ
- ลิงก์เอกสารต้นฉบับในหน้าแหล่งอ้างอิง (คุรุสภา, ราชกิจจานุเบกษา, SEAMEO, UNESCO ฯลฯ)
- หน้า 404 และหน้า About
- Privacy: แบบประเมินประมวลผลบนเครื่องผู้ใช้เท่านั้น ไม่เก็บข้อมูลส่วนบุคคล

## สิ่งที่ควรทำต่อ (ระยะ 4)

1. ตรวจทานถ้อยคำทางกฎหมายทุกหน้ากับเอกสารต้นฉบับ
2. กำหนด custom domain (เมื่อพร้อม)
3. Self-host ฟอนต์ Noto Thai (ลด dependency Google Fonts)
4. พัฒนาแบบประเมินฉบับเต็มพร้อมบันทึก IDP (ต้องมีระบบสมาชิก)

## ข้อจำกัดความรับผิดชอบ

เว็บไซต์นี้เป็นงานออกแบบเชิงวิชาการและสาธารณะ สรุปสาระจากเอกสารทางการเพื่อความเข้าใจ โปรดตรวจสอบถ้อยคำทางกฎหมายกับเอกสารต้นฉบับที่มีผลใช้บังคับก่อนนำไปอ้างอิงหรือเผยแพร่จริง
