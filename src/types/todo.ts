export type Todo = {
  id: string;
  title: string;
  detail?: string;   // 👈 追加！「?」をつけて、なくてもOKにするお
  status: "waiting" | "working" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  deadline?: Date;
};