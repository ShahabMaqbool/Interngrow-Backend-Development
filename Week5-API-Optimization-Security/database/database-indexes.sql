

-- Week 5 - Database Indexing

CREATE INDEX idx_tasks_project_id
ON tasks(project_id);

CREATE INDEX idx_tasks_status
ON tasks(status);

CREATE INDEX idx_tasks_priority
ON tasks(priority);

CREATE INDEX idx_tasks_due_date
ON tasks(due_date);

CREATE INDEX idx_tasks_created_by
ON tasks(created_by);