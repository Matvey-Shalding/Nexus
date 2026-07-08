# DEVELOPMENT ORDER (STRICT)

---

# 1. BACKEND FOUNDATION

## 1.1 Project setup
- FastAPI app structure
- Config (.env)
- Database connection (PostgreSQL)
- Alembic migrations setup

---

## 1.2 Base models
- User
- Base timestamps mixin

---

## 1.3 Auth system
- Register endpoint
- Login endpoint
- JWT access token
- JWT refresh token
- Password hashing (bcrypt)
- Auth middleware (protected routes)

---

## 1.4 User session layer
- Get current user endpoint
- Logout (token invalidate strategy or client-only removal)

---

# 2. NOTES CORE

## 2.1 Database models
- Note
- Folder
- Tag
- NoteTag relation (many-to-many)

---

## 2.2 Notes API
- Create note
- Update note
- Delete note
- Get note by id
- List notes (pagination)
- Search notes (basic LIKE query)

---

## 2.3 Folder system
- Create folder
- Rename folder
- Delete folder
- Assign note → folder

---

## 2.4 Tags system
- Create tag
- Assign tag to note
- Remove tag from note
- Filter notes by tag

---

# 3. TASK SYSTEM

## 3.1 Models
- Task
- TaskStatus enum (todo / doing / done)
- Priority enum (low / medium / high)

---

## 3.2 API
- Create task
- Update task
- Delete task
- List tasks
- Filter by status
- Filter by priority

---

## 3.3 Task extensions
- Due date
- Sort by priority/date

---

# 4. PROJECT SYSTEM

## 4.1 Models
- Project

---

## 4.2 Relations
- Project → Notes
- Project → Tasks

---

## 4.3 API
- Create project
- Update project
- Delete project
- Get project details
- Assign note/task to project

---

# 5. FRONTEND FOUNDATION

## 5.1 Setup
- React + Vite + TS
- Router setup
- Auth context/store
- API client (Axios)

---

## 5.2 Layout
- Sidebar
- Topbar
- Protected layout wrapper

---

## 5.3 Auth UI
- Login page
- Register page
- Token handling

---

# 6. NOTES FRONTEND

## 6.1 UI
- Notes list
- Note editor
- Folder sidebar
- Tag display

---

## 6.2 Features
- Create note
- Edit note
- Delete note
- Move to folder
- Assign tags

---

# 7. TASK FRONTEND

## 7.1 Views
- List view
- Kanban board

---

## 7.2 Features
- Create task
- Edit task
- Change status
- Set priority
- Set due date

---

# 8. PROJECT FRONTEND

## 8.1 UI
- Project list
- Project page

---

## 8.2 Features
- View linked notes/tasks
- Assign items to project

---

# 9. CALENDAR + TIME BLOCKING

## 9.1 Backend
- TimeBlock model
- Start time / end time

---

## 9.2 Frontend
- Calendar view
- Drag & drop blocks
- Daily planner view

---

# 10. POMODORO SYSTEM

## 10.1 Backend
- PomodoroSession model
- Link session → task/project

---

## 10.2 Frontend
- Timer UI
- Session tracking
- Start / pause / stop

---

# 11. ATTACHMENTS

## 11.1 Backend
- Attachment model
- File upload endpoint
- File storage (/uploads)

---

## 11.2 Frontend
- Upload UI
- File list in notes
- Preview attachments

---

# 12. DASHBOARD

## 12.1 Backend
- Aggregation endpoints:
  - today tasks
  - weekly stats
  - focus time

---

## 12.2 Frontend
- Dashboard widgets
- Stats cards
- Charts

---

# 13. AI LAYER (LAST)

## 13.1 Backend AI
- Ollama integration
- Embedding pipeline
- Qdrant vector DB
- RAG search pipeline

---

## 13.2 Features
- Global search
- Chat with notes/tasks
- Summaries
- “What did I do last week?”

---

# STRICT BUILD ORDER SUMMARY

1. Backend setup
2. Auth
3. Notes backend
4. Tasks backend
5. Projects backend
6. Frontend base
7. Notes UI
8. Tasks UI
9. Projects UI
10. Calendar / Time blocks
11. Pomodoro
12. Attachments
13. Dashboard
14. AI
