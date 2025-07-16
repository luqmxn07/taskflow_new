import tkinter as tk
from tkinter import messagebox
import time

class FocusFlowApp:
    def __init__(self, root):
        self.root = root
        self.root.title("FocusFlow – Your Digital Study Companion")
        self.root.geometry("400x550")
        self.root.configure(bg="#f9fafb")
        self.tasks = []
        self.running = False
        self.remaining = 25 * 60

        # Title
        self.title_label = tk.Label(
            root, text="FocusFlow\nYour Digital Study Companion",
            font=("Inter", 16, "bold"), bg="#f9fafb", fg="#1f2937"
        )
        self.title_label.pack(pady=20)

        # Timer Section
        self.timer_frame = tk.Frame(root, bg="white", bd=2, relief="groove", padx=20, pady=20)
        self.timer_frame.pack(pady=10, padx=20, fill="x")

        self.time_label = tk.Label(
            self.timer_frame, text="25:00", font=("Inter", 40, "bold"), fg="#2563eb"
        )
        self.time_label.pack()

        self.button_frame = tk.Frame(self.timer_frame, bg="white")
        self.button_frame.pack(pady=10)

        self.start_button = tk.Button(
            self.button_frame, text="Start", command=self.start_timer,
            bg="#60a5fa", fg="white", font=("Inter", 12), width=8
        )
        self.reset_button = tk.Button(
            self.button_frame, text="Reset", command=self.reset_timer,
            bg="#d1d5db", fg="#1f2937", font=("Inter", 12), width=8
        )

        self.start_button.pack(side="left", padx=5)
        self.reset_button.pack(side="left", padx=5)

        # To-Do List Section
        self.todo_frame = tk.Frame(root, bg="white", bd=2, relief="groove", padx=15, pady=15)
        self.todo_frame.pack(pady=10, padx=20, fill="x")

        self.task_entry = tk.Entry(self.todo_frame, font=("Inter", 12), width=25)
        self.task_entry.pack(side="left", expand=True, fill="x")

        self.add_task_button = tk.Button(
            self.todo_frame, text="Add", command=self.add_task,
            bg="#6ee7b7", fg="white", font=("Inter", 12), width=6
        )
        self.add_task_button.pack(side="left", padx=5)

        self.task_listbox = tk.Listbox(root, width=50, height=8, font=("Inter", 12))
        self.task_listbox.pack(pady=10, padx=20)

        # Motivational Quote Section
        self.quote_frame = tk.Frame(root, bg="white", bd=2, relief="groove", padx=15, pady=15)
        self.quote_frame.pack(pady=10, padx=20, fill="x")

        self.quote_label = tk.Label(
            self.quote_frame, text="“Don’t watch the clock; do what it does. Keep going.”\n– Sam Levenson",
            font=("Inter", 12, "italic"), fg="#6b7280", wraplength=350, justify="center"
        )
        self.quote_label.pack()

    def start_timer(self):
        if not self.running:
            self.running = True
            self.countdown()

    def reset_timer(self):
        self.running = False
        self.remaining = 25 * 60
        self.time_label.config(text="25:00")

    def countdown(self):
        if self.running and self.remaining > 0:
            self.remaining -= 1
            mins, secs = divmod(self.remaining, 60)
            self.time_label.config(text=f"{mins:02}:{secs:02}")
            self.root.after(1000, self.countdown)
        elif self.remaining == 0:
            self.running = False
            messagebox.showinfo("Time's up!", "Great job focusing!")

    def add_task(self):
        task = self.task_entry.get()
        if task.strip():
            self.tasks.append(task)
            self.task_listbox.insert(tk.END, task)
            self.task_entry.delete(0, tk.END)

if __name__ == "__main__":
    root = tk.Tk()
    app = FocusFlowApp(root)
    root.mainloop()