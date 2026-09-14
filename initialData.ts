import { DocItem, Folder } from './types';

export const INITIAL_FOLDERS: Folder[] = [
  { id: 'all', name: 'Все файлы (All Files)', iconName: 'Files' },
  { id: 'f-contracts', name: 'Договоры и Право (Contracts)', color: '#3b82f6' },
  { id: 'f-tech', name: 'Техническая документация (Tech Spec)', color: '#10b981' },
  { id: 'f-reports', name: 'Отчеты и Аналитика (Reports)', color: '#f59e0b' },
  { id: 'f-meeting', name: 'Протоколы и Встречи (Meeting Notes)', color: '#8b5cf6' },
  { id: 'f-creative', name: 'Черновики и Заметки (Drafts & Notes)', color: '#ec4899' },
  { id: 'f-hr', name: 'Регламенты и HR (HR Policies)', color: '#6366f1' },
];

export const INITIAL_DOCUMENTS: DocItem[] = [
  {
    id: 'doc-1',
    title: 'Договор оказания услуг N 2026-402',
    filename: 'Договор_оказания_услуг_2026.docx',
    extension: 'docx',
    folderId: 'f-contracts',
    category: 'Legal & Contracts',
    tags: ['Контракт', '2026', 'Юриспруденция', 'Подписано'],
    status: 'Final',
    author: 'Алексей Смирнов',
    sizeBytes: 48500,
    wordCount: 1420,
    characterCount: 9850,
    lineCount: 180,
    readingTimeMinutes: 6,
    createdAt: '2026-01-15T10:30:00Z',
    updatedAt: '2026-02-10T14:22:00Z',
    isFavorite: true,
    isArchived: false,
    docxMetadata: {
      fontFamily: 'Calibri',
      hasTables: true,
      hasImages: false,
      pageCountEstimate: 4
    },
    content: `# ДОГОВОР ОКАЗАНИЯ УСЛУГ № 2026-402

**г. Москва**                                                      **"15" января 2026 г.**

Общество с ограниченной ответственностью «ТехноИнновации», именуемое в дальнейшем «Исполнитель», в лице Генерального директора Иванова И.И., действующего на основании Устава, с одной стороны, и ООО «ВекторРазвития», именуемое в дальнейшем «Заказчик», заключили настоящий Договор о нижеследующем:

---

## 1. ПРЕДМЕТ ДОГОВОРА

1.1. Исполнитель обязуется по заданию Заказчика оказать комплексные консультационные и инжиниринговые услуги по разработке программного обеспечения и интеграции облачной инфраструктуры, а Заказчик обязуется принять и оплатить эти услуги в порядке и на условиях, предусмотренных настоящим Договором.

1.2. Подробный объем услуг, этапы выполнения, сроки и критерии приемки определяются в Техническом задании (Приложение №1), являющемся неотъемлемой частью настоящего Договора.

---

## 2. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ

2.1. Общая стоимость услуг по настоящему Договору составляет **2 450 000 (Два миллиона четыреста пятьдесят тысяч) рублей 00 копеек**, без НДС (применение УСН).

2.2. Оплата производится поэтапно согласно Графику платежей:
- **Этап 1 (Предоплата):** 30% в течение 5 (пяти) банковских дней с момента подписания Договора;
- **Этап 2 (Промежуточная приемка):** 40% после сдачи модулей Архитектуры и API;
- **Этап 3 (Финальный расчет):** 30% в течение 10 дней после подписания итогового Акта сдачи-приемки.

---

## 3. СРОКИ ВЫПОЛНЕНИЯ РАБОТ

3.1. Начало выполнения работ: **16 января 2026 года**.
3.2. Окончание выполнения работ: **30 апреля 2026 года**.

---

## 4. ОТВЕТСТВЕННОСТЬ СТОРОН

4.1. За неисполнение или ненадлежащее исполнение обязательств Стороны несут ответственность в соответствии с действующим законодательством РФ.
4.2. В случае просрочки оплаты Заказчик уплачивает пени в размере 0.1% от суммы задолженности за каждый день просрочки.

---

## 5. ПОДПИСИ И РЕКВИЗИТЫ СТОРОН

| Исполнитель: ООО «ТехноИнновации» | Заказчик: ООО «ВекторРазвития» |
|---|---|
| ИНН/КПП: 7701234567 / 770101001 | ИНН/КПП: 7709876543 / 770901001 |
| Р/с: 40702810900000001234 | Р/с: 40702810100000005678 |
| Генеральный директор ________ / Иванов И.И. / | Директор ________ / Петров П.П. / |`,
    comments: [
      { id: 'c1', author: 'Елена (Юрист)', text: 'Проверить пункт 2.2 на предмет налоговых рисков УСН.', createdAt: '2026-01-16T09:12:00Z', lineNumber: 18 }
    ],
    versions: [
      { id: 'v1', versionNumber: 1, updatedAt: '2026-01-15T10:30:00Z', updatedBy: 'Алексей Смирнов', summary: 'Первоначальная редакция договора', content: 'Черновик договора № 2026-402' },
      { id: 'v2', versionNumber: 2, updatedAt: '2026-02-10T14:22:00Z', updatedBy: 'Алексей Смирнов', summary: 'Согласована сумма и график платежей', content: 'Финальная согласованная редакция' }
    ]
  },
  {
    id: 'doc-2',
    title: 'Техническое задание на разработку API и БД',
    filename: 'System_Architecture_Spec_v3.docx',
    extension: 'docx',
    folderId: 'f-tech',
    category: 'Technical & Code',
    tags: ['Архитектура', 'API', 'PostgreSQL', 'Vite', 'React'],
    status: 'In Review',
    author: 'Мария Корнеева',
    sizeBytes: 32400,
    wordCount: 1150,
    characterCount: 8200,
    lineCount: 145,
    readingTimeMinutes: 5,
    createdAt: '2026-02-01T11:00:00Z',
    updatedAt: '2026-03-01T09:15:00Z',
    isFavorite: true,
    isArchived: false,
    docxMetadata: {
      fontFamily: 'Segoe UI',
      hasTables: true,
      hasImages: true,
      pageCountEstimate: 3
    },
    content: `# ТЕХНИЧЕСКОЕ ЗАДАНИЕ: МИКРОСЕРВИСНАЯ СИСТЕМА И API v3

## 1. Введение и Цели
Настоящий документ описывает архитектуру high-load бэкенд сервиса для обработки и полнотекстового индексирования документов формата TXT, DOCX, PDF и Markdown.

### Ключевые требования к производительности:
- Время отклика при поиске по 100,000+ документам: **< 120ms**
- Пропускная способность закачки файлов (Throughput): **не менее 500 req/sec**
- Поддержка транзакционного отката при неудачной конвертации файлов.

---

## 2. Стек Технологий
1. **Frontend:** React 19, TypeScript 5.7, Vite 8, Tailwind CSS v4.
2. **Backend API:** Node.js (Fastify / Express framework).
3. **База данных:** PostgreSQL 16 с расширением pgvector для семантического поиска.
4. **Кэширование:** Redis Cluster (sessions, hot query results).

---

## 3. Структура Данных Document Entity

\`\`\`json
{
  "id": "uuid-v4",
  "filename": "string",
  "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "checksumSha256": "string",
  "wordCount": 1420,
  "vectorEmbedding": [0.023, -0.412, 0.891, ...],
  "extractedMetadata": {
    "author": "string",
    "encoding": "utf-8",
    "pageCount": 5
  }
}
\`\`\`

---

## 4. Безопасность и Доступ
- **Аутентификация:** OAuth2 / JWT с ротацией Refresh token.
- **Авторизация:** RBAC (Role-Based Access Control) с детальными правами: \`read:docs\`, \`write:docs\`, \`admin:manage\`.`,
    comments: [],
    versions: []
  },
  {
    id: 'doc-3',
    title: 'Конфигурация сервера и логи сбоя systemd.txt',
    filename: 'server_deployment_notes.txt',
    extension: 'txt',
    folderId: 'f-tech',
    category: 'Technical & Code',
    tags: ['Linux', 'DevOps', 'Logs', 'Nginx', 'Configuration'],
    status: 'Approved',
    author: 'Дмитрий Волков',
    sizeBytes: 18200,
    wordCount: 890,
    characterCount: 6400,
    lineCount: 120,
    readingTimeMinutes: 4,
    createdAt: '2026-02-14T16:00:00Z',
    updatedAt: '2026-02-14T16:45:00Z',
    isFavorite: false,
    isArchived: false,
    content: `===================================================================
DEPLOYMENT & SYSTEM LOGS REPORT - PRODUCTION CLUSTER 04
Generated at: 2026-02-14 16:45:12 UTC
Server IP: 192.168.10.42 (node-prod-east)
===================================================================

[ENV CONFIGURATION]
NODE_ENV=production
PORT=8443
MAX_FILE_UPLOAD_SIZE=50MB
ALLOWED_EXTENSIONS=.txt,.docx,.pdf,.md
LOG_LEVEL=info

[NGINX CONF SNIPPET]
server {
    listen 443 ssl http2;
    server_name docs.internal.company.io;

    ssl_certificate /etc/letsencrypt/live/docs.company.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/docs.company.io/privkey.pem;

    client_max_body_size 50M;

    location /api/v1/documents/upload {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;
    }
}

[SYSTEMD HEALTH CHECK LOGS]
● docx-worker.service - Docx Processing & Parsing Queue
   Loaded: loaded (/etc/systemd/system/docx-worker.service; enabled)
   Active: active (running) since Thu 2026-02-12 08:00:00 UTC; 2 days ago
 Main PID: 40921 (node)
    Tasks: 14 (limit: 4915)
   Memory: 184.2M
   CGroup: /system.slice/docx-worker.service
           └─40921 /usr/bin/node /opt/app/workers/docxProcessor.js

Feb 14 14:02:11 node-prod-east docx-worker[40921]: [INFO] Successfully parsed Contract_2026.docx (1420 words)
Feb 14 14:15:33 node-prod-east docx-worker[40921]: [INFO] Batch job finished. 45 documents processed. Zero errors.
Feb 14 15:30:00 node-prod-east docx-worker[40921]: [WARN] High memory spike detected during large docx zip decompression. GC executed.
Feb 14 16:40:02 node-prod-east docx-worker[40921]: [INFO] Healthcheck ping OK (2ms latency).`,
    comments: [],
    versions: []
  },
  {
    id: 'doc-4',
    title: 'Отчет о финансовых результатах Q1 2026',
    filename: 'Financial_Report_Q1_2026.docx',
    extension: 'docx',
    folderId: 'f-reports',
    category: 'Reports & Analytics',
    tags: ['Финансы', 'Q1', 'Отчет', 'Бюджет', 'KPI'],
    status: 'Final',
    author: 'Ольга Васильева',
    sizeBytes: 52100,
    wordCount: 1850,
    characterCount: 13200,
    lineCount: 210,
    readingTimeMinutes: 8,
    createdAt: '2026-03-01T08:00:00Z',
    updatedAt: '2026-03-05T12:00:00Z',
    isFavorite: true,
    isArchived: false,
    docxMetadata: {
      fontFamily: 'Arial',
      hasTables: true,
      hasImages: true,
      pageCountEstimate: 5
    },
    content: `# ФИНАНСОВЫЙ ОТЧЕТ И АНАЛИЗ ПОКАЗАТЕЛЕЙ ЗА I КВАРТАЛ 2026 ГОДА

## 1. Резюме Руководства (Executive Summary)
В первом квартале 2026 года выручка компании увеличилась на **+24.8%** по сравнению с аналогичным периодом прошлого года и составила **48.2 млн рублей**. Ключевыми драйверами роста выступили корпоративные продажи продуктов документооборота и расширение подписок на облачную платформу.

---

## 2. Финансовые Показатели (Сводная таблица)

| Показатель | Q1 2025 (Факт) | Q1 2026 (План) | Q1 2026 (Факт) | Отклонение к Плану |
|---|---|---|---|---|
| Выручка (Revenue) | 38.6 млн руб. | 44.0 млн руб. | **48.2 млн руб.** | **+9.5%** |
| Валовая прибыль | 24.1 млн руб. | 28.5 млн руб. | **31.8 млн руб.** | **+11.5%** |
| Операционные расходы (OPEX) | 14.2 млн руб. | 16.0 млн руб. | **15.8 млн руб.** | **-1.25%** |
| EBITDA | 9.9 млн руб. | 12.5 млн руб. | **16.0 млн руб.** | **+28.0%** |
| Рентабельность EBITDA | 25.6% | 28.4% | **33.1%** | **+4.7 п.п.** |

---

## 3. Анализ Затрат по Направлениям
1. **Фонд оплаты труда (ФОТ):** 62% от общих операционных расходов. Рост обусловлен наймом senior разработчиков.
2. **Маркетинг и привлечение (CAC):** 18% OPEX. Средняя стоимость привлечения B2B клиента снизилась на 12%.
3. **Облачная инфраструктура и серверы:** 12% OPEX. Оптимизация обработки TXT и DOCX файлов позволила сократить расходы на хостинг на 8%.

---

## 4. Прогноз и Стратегические Цели на Q2 2026
- Запуск модуля автоматической суммаризации DOCX файлов.
- Выход на новые региональные рынки с прогнозируемым приростом выручки до 55 млн руб. в Q2.`,
    comments: [],
    versions: []
  },
  {
    id: 'doc-5',
    title: 'Протокол встречи команды разработки 02.03.2026.txt',
    filename: 'Meeting_Notes_2026_03_02.txt',
    extension: 'txt',
    folderId: 'f-meeting',
    category: 'Project Management',
    tags: ['Спринт', 'Meeting', 'Agile', 'Задачи'],
    status: 'Approved',
    author: 'Анна Кузнецова',
    sizeBytes: 9400,
    wordCount: 520,
    characterCount: 3800,
    lineCount: 75,
    readingTimeMinutes: 3,
    createdAt: '2026-03-02T15:00:00Z',
    updatedAt: '2026-03-02T16:20:00Z',
    isFavorite: false,
    isArchived: false,
    content: `ПРОТОКОЛ ЕЖЕНЕДЕЛЬНОЙ ВСТРЕЧИ КОМАНДЫ РАЗРАБОТКИ
Дата: 02 марта 2026 г.
Время: 11:00 - 12:15 MSK
Участники: Алексей, Мария, Дмитрий, Ольга, Сергей, Анна (Scrum Master)

------------------------------------------------------------------
ПОВЕСТКА ДНЯ:
1. Итоги Спринта #42 (Поддержка DOCX файлов)
2. Демо функционала массовой загрузки TXT файлов
3. Планирование Спринта #43
------------------------------------------------------------------

1. ИТОГИ СПРИНТА #42:
- Успешно реализован парсинг структурированных таблицы из документов DOCX.
- Оптимизирован поиск по содержимому больших текстовых файлов (.txt > 10MB).
- Все 18 задач спринта выполнены на 100%.

2. ПРИНЯТЫЕ РЕШЕНИЯ И ДЕЙСТВИЯ (ACTION ITEMS):
[ ] Мария: Реализовать встроенный просмотрщик с подсветкой ключевых слов к 06.03.2026.
[ ] Дмитрий: Добавить выгрузку отчетов в формате DOCX и TXT к 08.03.2026.
[ ] Алексей: Провести нагрузочное тестирование загрузки 100 файлов одновременно.
[ ] Ольга: Подготовить обновленную документацию для конечных пользователей.

3. СЛЕДУЮЩАЯ ВСТРЕЧА:
9 марта 2026 г. в 11:00 (Zoom Room #4)`.trim(),
    comments: [],
    versions: []
  },
  {
    id: 'doc-6',
    title: 'Политика обработки персональных данных.docx',
    filename: 'Privacy_Policy_2026.docx',
    extension: 'docx',
    folderId: 'f-hr',
    category: 'HR & Onboarding',
    tags: ['Регламент', 'GDPR', 'ФЗ-152', 'Безопасность', 'HR'],
    status: 'Final',
    author: 'Юридический отдел',
    sizeBytes: 38900,
    wordCount: 1310,
    characterCount: 9100,
    lineCount: 150,
    readingTimeMinutes: 5,
    createdAt: '2026-01-10T09:00:00Z',
    updatedAt: '2026-01-12T11:00:00Z',
    isFavorite: false,
    isArchived: false,
    docxMetadata: {
      fontFamily: 'Times New Roman',
      hasTables: false,
      hasImages: false,
      pageCountEstimate: 4
    },
    content: `# ПОЛИТИКА ОБРАБОТКИ И ЗАЩИТЫ ПЕРСОНАЛЬНЫХ ДАННЫХ

## 1. Общие положения
1.1. Настоящая Политика обработки персональных данных (далее – Политика) определяет порядок обработки и меры по обеспечению безопасности персональных данных, предпринимаемые в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».

1.2. Оператор ставит своей важнейшей целью соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.

---

## 2. Основные понятия
- **Автоматизированная обработка персональных данных** – обработка с помощью средств вычислительной техники.
- **Персональные данные** – любая информация, относящаяся прямо или косвенно к определенному физическому лицу.
- **Безопасность персональных данных** – защищенность данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования.

---

## 3. Цели Обработки Данных
1. Обеспечение функционирования сервисов управления документами TXT и DOCX.
2. Заключение, исполнение и прекращение гражданско-правовых договоров.
3. Предоставление пользователю доступа к персональному кабинету и хранилищу файлов.`,
    comments: [],
    versions: []
  },
  {
    id: 'doc-7',
    title: 'План онбординга нового сотрудника (DevOps/QA).txt',
    filename: 'Onboarding_Checklist_2026.txt',
    extension: 'txt',
    folderId: 'f-hr',
    category: 'HR & Onboarding',
    tags: ['HR', 'Онбординг', 'Чеклист', 'Инструкция'],
    status: 'Draft',
    author: 'Екатерина Морозова',
    sizeBytes: 6800,
    wordCount: 410,
    characterCount: 2900,
    lineCount: 55,
    readingTimeMinutes: 2,
    createdAt: '2026-02-20T13:10:00Z',
    updatedAt: '2026-02-22T09:30:00Z',
    isFavorite: false,
    isArchived: false,
    content: `ЧЕК-ЛИСТ ОНБОРДИНГА ДЛЯ НОВОГО СОТРУДНИКА

ДЕНЬ 1: Первичное погружение
[x] Получение рабочей учетной записи и доступов к корпоративной почте.
[x] Знакомство с командой и наставником (Mentor).
[ ] Настройка рабочего окружения: Git, Node.js v22, Docker, VS Code.
[ ] Ознакомление с Политикой безопасности и регламентами хранения документов (.txt, .docx).

НЕДЕЛЯ 1: Практика и процессы
[ ] Разбор архитектуры системы и репозитория проектов.
[ ] Выполнение первого обучающего тикета (First Good Issue).
[ ] Участие в ежедневном Daily Standup в 10:30.

МЕСЯЦ 1: Испытательный срок
[ ] Самостоятельная сдача фичи в продакшен.
[ ] Прохождение промежуточного 1-on-1 с Тимлидом.`.trim(),
    comments: [],
    versions: []
  },
  {
    id: 'doc-8',
    title: 'Маркетинговая стратегия продвижения DocHub 2026.docx',
    filename: 'Marketing_Strategy_2026.docx',
    extension: 'docx',
    folderId: 'f-creative',
    category: 'Marketing & Content',
    tags: ['Маркетинг', 'Стратегия', 'SEO', 'Контент', 'B2B'],
    status: 'In Review',
    author: 'Роман Белов',
    sizeBytes: 41200,
    wordCount: 1280,
    characterCount: 8900,
    lineCount: 160,
    readingTimeMinutes: 5,
    createdAt: '2026-02-25T10:00:00Z',
    updatedAt: '2026-03-03T14:10:00Z',
    isFavorite: true,
    isArchived: false,
    docxMetadata: {
      fontFamily: 'Montserrat',
      hasTables: true,
      hasImages: true,
      pageCountEstimate: 4
    },
    content: `# МАРКЕТИНГОВАЯ СТРАТЕГИЯ И ПЛАН ПРОДВИЖЕНИЯ 2026

## 1. Целевая Аудитория
1. **Юридические фирмы и нотариусы:** Высокая потребность в быстрой обработке текстовых файлов (.txt, .docx, шаблонов договоров).
2. **IT-компании и стартапы:** Ведение технической документации, база знаний, спецификации.
3. **Финансовые и аналитические отделы:** Анализ текстовых отчетов, экспортируемых из ERP систем.

---

## 2. Ключевые Каналы Продвижения
- **Контент-маркетинг & SEO:** Статьи на VC.ru, Хабр, экспертные обзоры "Как оптимизировать работу с DOCX и TXT файлами в 2026 году".
- **Прямые B2B продажи (Outbound):** Работа с крупными корпоративными клиентами.
- **Реферальная программа:** Скидки 15% за приглашение коллег.

---

## 3. Конкурентные Преимущества
- Высокая скорость работы браузерного просмотрщика (Vite + React 19).
- Полная автономность и локальная конфиденциальность данных.
- Поддержка мгновенного сплит-сравнения двух текстовых файлов.`,
    comments: [],
    versions: []
  },
  {
    id: 'doc-9',
    title: 'Заметки по идеям нового ИИ-модуля для текста.txt',
    filename: 'AI_Text_Summarizer_Ideas.txt',
    extension: 'txt',
    folderId: 'f-creative',
    category: 'Creative & Notes',
    tags: ['ИИ', 'Идеи', 'Инновации', 'LLM', 'Черновик'],
    status: 'Draft',
    author: 'Сергей Петров',
    sizeBytes: 4200,
    wordCount: 290,
    characterCount: 1950,
    lineCount: 38,
    readingTimeMinutes: 1,
    createdAt: '2026-03-04T08:20:00Z',
    updatedAt: '2026-03-04T08:20:00Z',
    isFavorite: false,
    isArchived: false,
    content: `ИДЕИ ДЛЯ ИНТЕГРАЦИИ AI В РАБОТУ С TXT И DOCX ФАЙЛАМИ:

1. Автоматическое извлечение ключевых сущностей (NER):
   - Поиск дат, сумм в рублях/долларах, фамилий и названий компаний в текстах договоров.

2. Быстрый суммаризатор (Summary Generator):
   - Генерация краткой выжимки из 5-10 предложений для длинных .docx файлов.

3. Авто-исправление опечаток и форматирования:
   - Приведение заголовков к единому стандарту Markdown/Docx.

4. Переводчик документов:
   - Мгновенный локальный перевод TXT файлов с сохранением абзацев.`.trim(),
    comments: [],
    versions: []
  },
  {
    id: 'doc-10',
    title: 'Регламент хранения и архивации документов.docx',
    filename: 'Document_Archival_Policy.docx',
    extension: 'docx',
    folderId: 'f-hr',
    category: 'HR & Onboarding',
    tags: ['Архив', 'Регламент', 'Хранение', 'Безопасность'],
    status: 'Approved',
    author: 'Архивная служба',
    sizeBytes: 29000,
    wordCount: 980,
    characterCount: 6800,
    lineCount: 110,
    readingTimeMinutes: 4,
    createdAt: '2026-01-05T14:00:00Z',
    updatedAt: '2026-01-08T10:00:00Z',
    isFavorite: false,
    isArchived: false,
    docxMetadata: {
      fontFamily: 'Calibri',
      hasTables: true,
      hasImages: false,
      pageCountEstimate: 3
    },
    content: `# РЕГЛАМЕНТ СРОКОВ ХРАНЕНИЯ И АРХИВАЦИИ ЭЛЕКТРОННЫХ ДОКУМЕНТОВ

## 1. Сроки Хранения по Категориям

| Категория Документа | Форматы Файлов | Срок Хранения | Порядок Уничтожения/Архивации |
|---|---|---|---|
| Договоры и Акты | DOCX, PDF | 5 лет после окончания действия | Автоматический перенос в холодный архив |
| Техническая Документация | TXT, DOCX, MD | Бессрочно | Обновление версий по мере релизов |
| Финансовые Отчеты | DOCX, XLSX | 10 лет | Резервное копирование на 2 носителя |
| Черновики и Рабочие Заметки | TXT | 1 год | Удаление при отсутствии активности |

---

## 2. Требования к Форматам
- Для долгосрочного хранения текстовых текстовых материалов рекомендуются форматы **UTF-8 TXT** и стандартизированный **DOCX (OpenXML)**.`,
    comments: [],
    versions: []
  }
];
