from app.types.task import TaskGroup

from app.schemas.task import (
    TaskGroup as TaskGroupDTO,
    TaskGroupCreationOptions,
    TaskResponse,
)


def map_tasks(task_groups: list[TaskGroup]) -> list[TaskGroupDTO]:

    result: list[TaskGroupDTO] = []

    for task_group in task_groups:

        tasks = [TaskResponse.model_validate(task) for task in task_group["tasks"]]

        result.append(
            TaskGroupDTO(
                id=task_group["id"],
                title=task_group["title"],
                tasks=tasks,
                creation=TaskGroupCreationOptions.model_validate(
                    task_group["creation"]
                ),
            )
        )

    return result
