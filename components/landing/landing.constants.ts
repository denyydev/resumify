import {
  FileText,
  Zap,
  Download,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

export const heroBadges = [
  { icon: "ats", label: "Дружит с ATS", tone: "cyan" as const },
  { icon: "rt", label: "Превью в реальном времени", tone: "emerald" as const },
  { icon: "tpl", label: "20+ шаблонов", tone: "purple" as const },
  { icon: "lang", label: "Мультиязычность", tone: "blue" as const },
];

export const heroHighlights = [
  {
    icon: Users,
    title: "Для любой профессии",
    description:
      "Подходит для IT, маркетинга, финансов, медицины, образования и креативных индустрий.",
  },
  {
    icon: Shield,
    title: "Приватность прежде всего",
    description:
      "Данные под контролем: экспортируйте и удаляйте в любой момент. Без скрытых подписок.",
  },
  {
    icon: Clock,
    title: "Экономит время",
    description:
      "Профессиональное резюме за минуты, а не часы. Обновления — в один клик.",
  },
];

export const features = [
  {
    icon: FileText,
    title: "Профессиональные шаблоны",
    description:
      "20+ шаблонов, оптимизированных под ATS — для любых отраслей и уровней.",
  },
  {
    icon: Zap,
    title: "Редактор в реальном времени",
    description:
      "Изменения видны сразу: редактируйте текст, переключайте шаблоны и мгновенно смотрите результат.",
  },
  {
    icon: Download,
    title: "Идеальный экспорт",
    description:
      "Скачивайте PDF, DOCX или простой текст — форматирование и внешний вид сохраняются.",
  },
  {
    icon: Globe,
    title: "Мультиязычность",
    description:
      "Создавайте резюме на английском, испанском, немецком, французском и других языках в один клик.",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description:
      "Ваши данные остаются приватными. Экспортируйте и удаляйте информацию в любой момент.",
  },
  {
    icon: TrendingUp,
    title: "Подсказки по карьере",
    description:
      "Рекомендации по содержанию, ключевым словам и оформлению, чтобы выделиться для рекрутеров.",
  },
];

export const stats = [
  { value: "50K+", label: "Создано резюме" },
  { value: "94%", label: "Довольны сервисом" },
  { value: "2.3×", label: "Больше интервью" },
  { value: "30+", label: "Стран" },
];

export const testimonials = [
  {
    name: "Alex Morgan",
    role: "Менеджер по маркетингу",
    text: "После ResumeCraft получил 3 приглашения на интервью уже в первую неделю. Шаблоны — современные и аккуратные.",
  },
  {
    name: "Sarah Chen",
    role: "Инженер-разработчик",
    text: "Наконец-то конструктор резюме, который понимает, что важно для тех-рекрутеров. Оптимизация под ATS — точная.",
  },
  {
    name: "David Wilson",
    role: "Финансовый аналитик",
    text: "Перешёл с классических шаблонов на ResumeCraft и почти сразу заметил больше ответов на отклики.",
  },
];
