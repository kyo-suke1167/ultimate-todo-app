export type Todo = {
  id: string;
  title: string;
  detail?: string;
  status: "waiting" | "working" | "completed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  deadline?: Date;
};