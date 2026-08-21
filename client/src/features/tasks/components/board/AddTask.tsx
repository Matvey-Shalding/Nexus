'use client';

import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { useAddTaskController } from '../../hooks/useAddTaskController';
import { ITaskGroupDefaultValues } from '../../types/Task';

import { AddTaskButton } from './ui/AddTaskButton';
import { TaskDateField } from './ui/TaskDateField';
import { TaskDeleteButton } from './ui/TaskDeleteButton';
import { TaskLayout } from './ui/TaskLayout';
import { TaskPriorityField } from './ui/TaskPriorityField';
import { TaskTitleField } from './ui/TaskTitleField';

interface Props {
	className?: string;
	defaultValues: ITaskGroupDefaultValues | null;
}

export const AddTask: React.FC<Props> = ({ defaultValues }) => {
	const {
		mode,
		setMode,
		title,
		date,
		taskRef,
		priority,
		handleTitleUpdate,
		handlePriorityUpdate,
		handleDateUpdate,
		reset,
	} = useAddTaskController(defaultValues);

	return (
		<AnimatePresence
			mode="wait"
			initial={false}
		>
			{mode === 'default' ? (
				<AddTaskButton handleClick={() => setMode('focused')} />
			) : (
				<motion.div
					key="add-task-wrapper"
					initial={{ opacity: 0, y: -4, scale: 0.99 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -4, scale: 0.99 }}
					transition={{ duration: 0.15, ease: 'easeOut' }}
				>
					<TaskLayout
						disableAnimation
						taskRef={taskRef}
					>
						<TaskTitleField
							addTaskMode
							title={title}
							inputProps={{
								autoFocus: true,
							}}
							handleTitleUpdate={handleTitleUpdate}
						/>
						<div className="flex items-center justify-between basis-full">
							<div className="flex items-center gap-x-2.5">
								<TaskDateField
									selectedDate={date}
									handleDateUpdate={handleDateUpdate}
								/>
								<TaskPriorityField
									selectedPriority={priority}
									handlePriorityUpdate={handlePriorityUpdate}
								/>
							</div>
							<TaskDeleteButton onDelete={reset} />
						</div>
					</TaskLayout>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
