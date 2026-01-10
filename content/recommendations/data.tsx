import { Alert, Card, Divider, List, Space, Tag, Typography } from "antd";
import {
  BadgeCheck,
  FileDown,
  FileText,
  Link as LinkIcon,
  ScanText,
  Search,
  ShieldCheck,
  Target,
  TriangleAlert,
  Users,
  Wand2,
} from "lucide-react";
import type { Messages } from "./messages";
import type { FaqItem, Locale, Pattern, Rule, Tool } from "./types";

const { Title, Paragraph, Text } = Typography;

export function getFaqItems(locale: Locale, t: Messages): FaqItem[] {
  const isRu = locale === "ru";
  return [
    {
      key: "ats",
      icon: <Search size={16} />,
      title: t.items.ats.title,
      tags: ["ATS"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            <Text strong>ATS</Text>{" "}
            {isRu
              ? "— системы, которые читают и сортируют резюме. Они ищут структуру и ключевые слова и могут «не понять» сложную верстку."
              : "is software that parses resumes and ranks them. It looks for structure and keywords and may fail on complex layouts."}
          </Paragraph>
          <Alert
            type="info"
            showIcon
            message={
              isRu
                ? "Если откликаешься через сайты/формы — ATS-friendly шаблон почти всегда лучший выбор."
                : "If you apply via job boards/forms, an ATS-friendly template is usually the safest choice."
            }
          />
        </Space>
      ),
    },
    {
      key: "length",
      icon: <Target size={16} />,
      title: t.items.length.title,
      tags: [isRu ? "1 страница" : "1 page"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "1 страница — идеальный стандарт. 2 страницы допустимы, если опыта реально много и каждая строка несёт пользу."
              : "1 page is the gold standard. 2 pages are acceptable only when your experience genuinely requires it and every line earns its place."}
          </Paragraph>
          <List
            bordered
            size="small"
            dataSource={[
              isRu
                ? "Скрывай второстепенные секции (activities/certifications), если не помещается."
                : "Hide secondary sections (activities/certifications) if you don't fit.",
              isRu
                ? "Делай 3–6 буллетов на роль вместо полотна текста."
                : "Prefer 3–6 bullets per role over long paragraphs.",
              isRu
                ? "Сокращай «описание компании», оставляя 1 строку контекста."
                : "Keep company context to ~1 line.",
            ]}
            renderItem={(x) => <List.Item>{x}</List.Item>}
          />
        </Space>
      ),
    },
    {
      key: "format",
      icon: <ShieldCheck size={16} />,
      title: t.items.format.title,
      tags: ["PDF", "ATS"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "Для ATS важны простая структура, один столбец и отсутствие декоративных элементов. Фото и графика часто мешают парсингу."
              : "For ATS, a simple one-column layout and minimal decoration matter. Photos and graphics often break parsing."}
          </Paragraph>
          <Alert
            type="warning"
            showIcon
            icon={<TriangleAlert size={16} />}
            message={
              isRu
                ? "Не используй таблицы/две колонки/иконки вместо текста в ATS-шаблоне."
                : "Avoid tables/two columns/icons as replacements for text in an ATS template."
            }
          />
        </Space>
      ),
    },
    {
      key: "links",
      icon: <LinkIcon size={16} />,
      title: t.items.links.title,
      tags: [isRu ? "ссылки" : "links"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "LinkedIn / GitHub / портфолио должны быть кликабельными и корректными. Правило: всегда добавляй https://"
              : "LinkedIn / GitHub / portfolio should be valid and clickable. Rule: always include https://"}
          </Paragraph>
          <List
            bordered
            size="small"
            dataSource={[
              isRu
                ? "Проверь, что ссылки кликаются в итоговом PDF."
                : "Verify links are clickable in the final PDF.",
              isRu
                ? "Лучше короткие и понятные URL (или clean domain)."
                : "Prefer short, clean URLs when possible.",
            ]}
            renderItem={(x) => <List.Item>{x}</List.Item>}
          />
        </Space>
      ),
    },
    {
      key: "structure",
      icon: <FileText size={16} />,
      title: t.items.structure.title,
      tags: [isRu ? "структура" : "structure"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "Читаемость важнее креатива. Стандартные заголовки секций помогают и ATS, и рекрутеру."
              : "Readability beats creativity. Standard section headings help both ATS and recruiters."}
          </Paragraph>
          <Card size="small">
            <Text strong>
              {isRu ? "Рекомендуемый порядок:" : "Suggested order:"}
            </Text>
            <Divider style={{ margin: "10px 0" }} />
            <Space wrap>
              <Tag>Header</Tag>
              <Tag>Summary</Tag>
              <Tag>Experience</Tag>
              <Tag>Projects</Tag>
              <Tag>Skills</Tag>
              <Tag>Education</Tag>
              <Tag>
                {isRu ? "Certifications/Extras" : "Certifications/Extras"}
              </Tag>
            </Space>
          </Card>
        </Space>
      ),
    },
    {
      key: "summary",
      icon: <BadgeCheck size={16} />,
      title: t.items.summary.title,
      tags: ["Summary"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "Summary — один из самых важных блоков. 3–5 строк: кто ты, сильные стороны, стек/домены, какую задачу ищешь."
              : "Summary is one of the most important blocks. 3–5 lines: who you are, strengths, stack/domains, and what you're looking for."}
          </Paragraph>
          <List
            bordered
            size="small"
            dataSource={[
              isRu
                ? "Пиши конкретно: «Frontend (React/TS), 3+ years, performance & DX»."
                : 'Be concrete: "Frontend (React/TS), 3+ years, performance & DX".',
              isRu
                ? "Не повторяй опыт целиком — только тезисы."
                : "Don't restate the whole experience — only highlights.",
            ]}
            renderItem={(x) => <List.Item>{x}</List.Item>}
          />
        </Space>
      ),
    },
    {
      key: "xyz",
      icon: <Target size={16} />,
      title: t.items.xyz.title,
      tags: ["XYZ"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "Вместо «что делал» — «что изменил». XYZ: достижение → действие → результат (цифры/эффект)."
              : 'Replace "what I did" with "what changed". XYZ: achievement → action → result (numbers/impact).'}
          </Paragraph>
          <Card size="small">
            <Text strong>{isRu ? "Примеры:" : "Examples:"}</Text>
            <Divider style={{ margin: "10px 0" }} />
            <List
              size="small"
              dataSource={[
                isRu
                  ? "Снизил(а) время загрузки на 35% оптимизацией bundle splitting и кеширования."
                  : "Reduced page load time by 35% via bundle splitting and caching.",
                isRu
                  ? "Уменьшил(а) количество багов в проде на 20% внедрив e2e smoke и CI-правила."
                  : "Decreased production bugs by 20% by introducing e2e smoke tests and CI rules.",
                isRu
                  ? "Сократил(а) cycle time с 10 до 6 дней улучшив review process."
                  : "Reduced cycle time from 10 to 6 days by improving the review process.",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </Card>
        </Space>
      ),
    },
    {
      key: "keywords",
      icon: <Search size={16} />,
      title: t.items.keywords.title,
      tags: [isRu ? "ключевые слова" : "keywords"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "Ключевые слова должны быть в резюме текстом: технологии, инструменты, домены. Идеально — и в Skills, и в Experience."
              : "Keywords should appear as plain text: technologies, tools, domains. Ideally both in Skills and in Experience."}
          </Paragraph>
          <Alert
            type="info"
            showIcon
            message={
              isRu
                ? "Практика: возьми описание вакансии и проверь, что важные слова реально присутствуют в резюме."
                : "Practice: copy the job description and ensure key terms actually appear in your resume."
            }
          />
        </Space>
      ),
    },
    {
      key: "mistakes",
      icon: <TriangleAlert size={16} />,
      title: t.items.mistakes.title,
      tags: [isRu ? "ошибки" : "mistakes"],
      content: (
        <List
          bordered
          size="small"
          dataSource={[
            isRu
              ? "Две колонки, таблицы, декоративные элементы — ATS может сломать парсинг."
              : "Two columns, tables, heavy decoration — ATS may fail parsing.",
            isRu
              ? "Длинные полотна текста вместо буллетов."
              : "Long walls of text instead of bullets.",
            isRu
              ? "«Отвечал за / занимался» без результата и метрик."
              : '"Responsible for" without results or metrics.',
            isRu
              ? "Ссылки без https:// или не кликабельные в PDF."
              : "Links without https:// or not clickable in PDF.",
            isRu
              ? "Слишком много второстепенного — размывает сильные стороны."
              : "Too much secondary info dilutes your strongest points.",
          ]}
          renderItem={(x) => <List.Item>• {x}</List.Item>}
        />
      ),
    },
    {
      key: "export",
      icon: <FileDown size={16} />,
      title: t.items.export.title,
      tags: [isRu ? "экспорт" : "export"],
      content: (
        <Space orientation="vertical" size={12}>
          <Paragraph style={{ margin: 0 }}>
            {isRu
              ? "Делай отдельный ATS-friendly шаблон: 1 колонка, минимум декора, нормальные заголовки секций."
              : "Use a dedicated ATS-friendly template: one column, minimal decoration, standard section headings."}
          </Paragraph>
          <List
            bordered
            size="small"
            dataSource={[
              isRu
                ? "Экспортируй PDF из ATS-шаблона: без фото, без иконок, 1 колонка."
                : "Export PDF from ATS template: no photo, no icons, one column.",
              isRu
                ? "Проверь, что текст выделяется/копируется."
                : "Check that text is selectable/copyable.",
              isRu
                ? "Открой PDF на телефоне и в браузере — всё должно читаться одинаково."
                : "Open the PDF on mobile and in browser — it should read consistently.",
            ]}
            renderItem={(x) => <List.Item>{x}</List.Item>}
          />
        </Space>
      ),
    },
    {
      key: "atsVsHuman",
      icon: <Users size={16} />,
      title: t.items.atsVsHuman.title,
      tags: [isRu ? "ATS vs Человек" : "ATS vs Human"],
      content: (
        <Space orientation="vertical" size={16}>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Что одинаково:" : "What's the same:"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "Структура: стандартные заголовки секций (Experience, Skills, Education)"
                  : "Structure: standard section headings (Experience, Skills, Education)",
                isRu
                  ? "Ключевые слова: технологии, инструменты, домены должны быть текстом"
                  : "Keywords: technologies, tools, domains must be plain text",
                isRu
                  ? "Читаемость: один столбец, логичный порядок, без визуального шума"
                  : "Readability: one column, logical order, no visual noise",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Что различается:" : "What differs:"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "ATS не понимает контекст: нужны явные ключевые слова, а не синонимы"
                  : "ATS doesn't understand context: needs explicit keywords, not synonyms",
                isRu
                  ? "Человек ценит метрики и достижения, ATS — совпадение терминов"
                  : "Humans value metrics and achievements, ATS — term matching",
                isRu
                  ? "Фото/графика: человеку может понравиться, ATS может сломать парсинг"
                  : "Photos/graphics: humans may like, ATS may break parsing",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
        </Space>
      ),
    },
    {
      key: "keywordsWorkflow",
      icon: <Wand2 size={16} />,
      title: t.items.keywordsWorkflow.title,
      tags: [isRu ? "ключевые слова" : "keywords"],
      content: (
        <Space orientation="vertical" size={16}>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Шаг 1: Извлечение" : "Step 1: Extraction"}
            </Title>
            <Paragraph style={{ margin: "8px 0" }}>
              {isRu
                ? "Скопируй описание вакансии. Выдели 8–12 ключевых терминов: технологии (React, TypeScript), инструменты (Git, Docker), домены (e-commerce, fintech), методологии (Agile, Scrum)."
                : "Copy the job description. Extract 8–12 key terms: technologies (React, TypeScript), tools (Git, Docker), domains (e-commerce, fintech), methodologies (Agile, Scrum)."}
            </Paragraph>
          </div>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Шаг 2: Размещение" : "Step 2: Placement"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "Skills: перечисли все ключевые технологии и инструменты"
                  : "Skills: list all key technologies and tools",
                isRu
                  ? "Experience: используй термины в описании ролей и достижений"
                  : "Experience: use terms in role descriptions and achievements",
                isRu
                  ? "Summary: упомяни 3–5 самых важных терминов"
                  : "Summary: mention 3–5 most important terms",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
          <Alert
            type="info"
            showIcon
            message={
              isRu
                ? "Проверка: открой резюме и убедись, что все ключевые слова присутствуют как обычный текст (не в иконках или графике)."
                : "Check: open your resume and ensure all keywords appear as plain text (not in icons or graphics)."
            }
          />
        </Space>
      ),
    },
    {
      key: "formatting",
      icon: <FileText size={16} />,
      title: t.items.formatting.title,
      tags: [isRu ? "форматирование" : "formatting"],
      content: (
        <Space orientation="vertical" size={16}>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Шрифты и размеры" : "Fonts and sizes"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "Используй стандартные шрифты (Arial, Calibri, Times New Roman)"
                  : "Use standard fonts (Arial, Calibri, Times New Roman)",
                isRu
                  ? "Размер: 10–12pt для основного текста, 14–16pt для заголовков"
                  : "Size: 10–12pt for body text, 14–16pt for headings",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Отступы и буллеты" : "Spacing and bullets"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "Единообразные отступы между секциями (0.5–1 см)"
                  : "Consistent spacing between sections (0.5–1 cm)",
                isRu
                  ? "Стандартные буллеты (• или -), не кастомные символы"
                  : "Standard bullets (• or -), not custom symbols",
                isRu
                  ? "3–6 буллетов на роль, каждый на отдельной строке"
                  : "3–6 bullets per role, each on a separate line",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Даты и формат" : "Dates and format"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "Единый формат дат: MM/YYYY или MMM YYYY (например, Jan 2020)"
                  : "Consistent date format: MM/YYYY or MMM YYYY (e.g., Jan 2020)",
                isRu
                  ? "Не используй только годы без месяцев для текущих ролей"
                  : "Don't use years only without months for current roles",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
        </Space>
      ),
    },
    {
      key: "linksPortfolio",
      icon: <LinkIcon size={16} />,
      title: t.items.linksPortfolio.title,
      tags: [isRu ? "ссылки" : "links"],
      content: (
        <Space orientation="vertical" size={16}>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Обязательно:" : "Required:"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "LinkedIn: полный URL с https://, проверь что профиль публичный"
                  : "LinkedIn: full URL with https://, ensure profile is public",
                isRu
                  ? "Email: рабочий адрес, проверь на опечатки"
                  : "Email: working address, check for typos",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {isRu ? "Опционально (но полезно):" : "Optional (but useful):"}
            </Title>
            <List
              size="small"
              dataSource={[
                isRu
                  ? "GitHub: если есть релевантные проекты или open source"
                  : "GitHub: if you have relevant projects or open source",
                isRu
                  ? "Портфолио: если работаешь в дизайне/фронтенде"
                  : "Portfolio: if you work in design/frontend",
                isRu
                  ? "Блог/статьи: если пишешь технические материалы"
                  : "Blog/articles: if you write technical content",
              ]}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
          <Alert
            type="warning"
            showIcon
            message={
              isRu
                ? "Все ссылки должны быть кликабельными в PDF. Проверь после экспорта."
                : "All links must be clickable in PDF. Verify after export."
            }
          />
        </Space>
      ),
    },
    {
      key: "redFlags",
      icon: <TriangleAlert size={16} />,
      title: t.items.redFlags.title,
      tags: [isRu ? "red flags" : "red flags"],
      content: (
        <Space orientation="vertical" size={16}>
          <List
            bordered
            size="small"
            dataSource={[
              isRu
                ? "Нечитабельность: слишком мелкий шрифт, плохой контраст, сложная верстка"
                : "Unreadability: too small font, poor contrast, complex layout",
              isRu
                ? "Спам-скиллы: список из 50+ технологий без контекста"
                : "Skill spam: list of 50+ technologies without context",
              isRu
                ? "Клише: 'team player', 'hard worker', 'detail-oriented' без примеров"
                : "Clichés: 'team player', 'hard worker', 'detail-oriented' without examples",
              isRu
                ? "Отсутствие метрик: только обязанности, без цифр и эффекта"
                : "No metrics: only duties, no numbers or impact",
              isRu
                ? "Устаревшие технологии: упоминание устаревших стеков без контекста"
                : "Outdated tech: mentioning obsolete stacks without context",
            ]}
            renderItem={(x) => <List.Item>• {x}</List.Item>}
          />
        </Space>
      ),
    },
  ];
}

export function getTldrItems(locale: Locale): string[] {
  const isRu = locale === "ru";
  return [
    isRu
      ? "1 страница (2 — если реально нужно)"
      : "1 page (2 only if necessary)",
    isRu ? "PDF, без фото/графики для ATS" : "PDF, no photo/graphics for ATS",
    isRu ? "Кликабельные ссылки (https://)" : "Clickable links (https://)",
    isRu ? "Стандартная структура секций" : "Standard section structure",
    isRu
      ? "XYZ-буллеты: эффект → действие → результат"
      : "XYZ bullets: impact → action → result",
    isRu
      ? "Ключевые слова из вакансии в тексте"
      : "Job keywords present as text",
  ];
}

export function getPatterns(locale: Locale): Pattern {
  const isRu = locale === "ru";
  return {
    summary: isRu
      ? [
          "Frontend Engineer (React/TypeScript), 3+ года. Делаю быстрые интерфейсы, улучшаю DX и качество релизов.",
          "Опыт: дизайн-системы, производительность, интеграции, A/B. Ищу продуктовую команду с фокусом на качество.",
        ]
      : [
          "Frontend Engineer (React/TypeScript), 3+ years. I build fast UIs, improve DX, and raise release quality.",
          "Experience: design systems, performance, integrations, A/B. Looking for a product team focused on quality.",
        ],
    bullets: isRu
      ? [
          "Снизил(а) {метрика} на {X%} за счёт {действие}; результат: {эффект}.",
          "Ускорил(а) {процесс} с {A} до {B} благодаря {изменение}.",
          "Внедрил(а) {практика} → снизил(а) {риски/баги} на {X%}.",
        ]
      : [
          "Reduced {metric} by {X%} via {action}; outcome: {impact}.",
          "Improved {process} from {A} to {B} by {change}.",
          "Introduced {practice} → decreased {bugs/risks} by {X%}.",
        ],
    skills:
      "Skills: React, TypeScript, Next.js, CSS, Testing (Playwright/Jest), Performance, Accessibility, CI/CD",
  };
}

export function getAtsRules(locale: Locale): Rule[] {
  const isRu = locale === "ru";
  return [
    {
      title: isRu ? "Заголовки секций" : "Section headings",
      good: isRu
        ? "Experience, Skills, Education — стандартные названия."
        : "Use standard headings: Experience, Skills, Education.",
      risky: isRu
        ? 'Креативные заголовки ("My Journey", "What I did").'
        : 'Creative headings ("My Journey", "What I did").',
      fix: isRu
        ? "Верни стандартные названия секций."
        : "Switch back to standard section titles.",
      example: isRu
        ? "Experience / Projects / Skills / Education"
        : "Experience / Projects / Skills / Education",
    },
    {
      title: isRu ? "Ссылки" : "Links",
      good: isRu
        ? "Полные URL с https://, кликабельные."
        : "Full https:// URLs, clickable.",
      risky: isRu
        ? '"github.com/me" без схемы, не кликается.'
        : "Naked domains without scheme, not clickable.",
      fix: isRu
        ? "Добавь https:// и проверь в PDF."
        : "Add https:// and verify in PDF.",
      example: "https://github.com/username",
    },
    {
      title: isRu ? "Буллеты" : "Bullets",
      good: isRu
        ? "3–6 буллетов, акцент на результат."
        : "3–6 bullets per role, impact-focused.",
      risky: isRu
        ? 'Полотна текста, "responsible for".'
        : 'Paragraph walls, "Responsible for".',
      fix: isRu
        ? "Перепиши в XYZ, добавь метрики."
        : "Rewrite using XYZ and add metrics.",
      example: isRu
        ? "Снизил время загрузки на 35% оптимизацией bundle splitting."
        : "Reduced page load time by 35% via bundle splitting.",
    },
  ];
}

export function getQuickTools(locale: Locale, t: Messages): Tool[] {
  const isRu = locale === "ru";
  return [
    {
      icon: <ScanText size={16} />,
      title: t.micro.tools.jobMatch,
      desc: isRu
        ? "Скопируй 8–12 ключевых слов из вакансии и проверь, что они есть текстом в Skills/Experience."
        : "Copy 8–12 key terms from the job post and ensure they appear as text in Skills/Experience.",
    },
    {
      icon: <LinkIcon size={16} />,
      title: t.micro.tools.linkCheck,
      desc: isRu
        ? "Открой PDF в браузере и кликни каждую ссылку. Если не кликается — добавь https://."
        : "Open the PDF in browser and click every link. If it's not clickable — add https://.",
    },
    {
      icon: <Wand2 size={16} />,
      title: t.micro.tools.pageFit,
      desc: isRu
        ? "Спрячь второстепенные секции, урежь контекст компании до 1 строки, оставь 3–6 буллетов."
        : "Hide secondary sections, keep company context to 1 line, use 3–6 bullets per role.",
    },
    {
      icon: <FileDown size={16} />,
      title: t.micro.tools.export,
      desc: isRu
        ? "Проверь, что текст выделяется мышью: это сигнал нормального текстового слоя для ATS."
        : "Ensure text is selectable: it often indicates a proper text layer for ATS.",
    },
  ];
}

export function getCommonWins(locale: Locale): string[] {
  const isRu = locale === "ru";
  return [
    isRu
      ? "Добавь 2–3 метрики в опыт (процент, время, количество)"
      : "Add 2–3 metrics to experience (percentage, time, quantity)",
    isRu
      ? "Перепиши 3 буллета по формуле XYZ (эффект → действие → результат)"
      : "Rewrite 3 bullets using XYZ formula (impact → action → result)",
    isRu
      ? "Сократи Summary до 3–5 строк, убрав общие фразы"
      : "Reduce Summary to 3–5 lines, removing generic phrases",
    isRu
      ? "Проверь, что все ключевые слова из вакансии присутствуют в резюме"
      : "Ensure all keywords from job posting appear in resume",
    isRu
      ? "Убедись, что ссылки кликабельны в PDF"
      : "Verify links are clickable in PDF",
    isRu
      ? "Спрячь второстепенные секции, если резюме не помещается на 1 страницу"
      : "Hide secondary sections if resume doesn't fit on 1 page",
    isRu
      ? "Используй ATS-friendly шаблон для онлайн-заявок"
      : "Use ATS-friendly template for online applications",
  ];
}

export function getExportQaChecklist(locale: Locale): string[] {
  const isRu = locale === "ru";
  return [
    isRu
      ? "Текст выделяется и копируется мышью"
      : "Text is selectable and copyable with mouse",
    isRu
      ? "Все ссылки кликабельны и открываются корректно"
      : "All links are clickable and open correctly",
    isRu
      ? "PDF читается одинаково на компьютере и телефоне"
      : "PDF reads the same on computer and mobile",
    isRu
      ? "Шрифты отображаются корректно (не искажены)"
      : "Fonts display correctly (not distorted)",
    isRu
      ? "Нет разрывов страниц в середине секций"
      : "No page breaks in the middle of sections",
    isRu
      ? "Фото (если есть) не искажено и не обрезано"
      : "Photo (if present) is not distorted or cropped",
  ];
}
