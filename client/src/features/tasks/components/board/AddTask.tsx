'use client';

import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/Calendar';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Textarea } from '@/shared/ui/textarea';
import { CheckCheck, GripVertical, Plus, Trash } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

import { useAddTaskController } from '../../hooks/useAddTaskController';
import { TPriority } from '../../types/Priority';
import { ITaskGroupDefaultValues } from '../../types/Task';

import { TaskLayout } from './TaskLayout';

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
		datePopupOpen,
		setDatePopupOpen,
		priorityPopupOpen,
		setPriorityPopupOpen,
		reset,
		formattedDate,
		priorityLabel,
		styleClass,
	} = useAddTaskController(defaultValues);

	return (
		<AnimatePresence
			mode="wait"
			initial={false}
		>
			{mode === 'default' ? (
				<motion.div
					key="add-task-button"
					initial={{ opacity: 0, y: -4 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -4 }}
					transition={{ duration: 0.15, ease: 'easeOut' }}
					className="w-full"
				>
					<Button
						variant="ghost"
						onClick={() => setMode('focused')}
						className="
          group flex w-full items-center justify-start gap-x-2.5
          h-auto rounded-lg border border-dashed border-border p-3
          bg-transparent hover:bg-muted/10 hover:border-border/80
          shadow-xl shadow-black/20
          transition-all duration-150 active:scale-[0.99]
        "
					>
						<div className="flex h-fit items-center gap-x-0.5">
							<Plus
								className="
              size-6 text-muted-foreground/60
              transition-transform duration-150
              group-hover:scale-103 group-hover:text-foreground
            "
							/>
						</div>

						<span
							className="
            font-heading text-lg/tight font-medium text-muted-foreground/70
            transition-colors duration-150
            group-hover:text-foreground
          "
						>
							Add task...
						</span>
					</Button>
				</motion.div>
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
						<div className="flex gap-x-2.5">
							<div className="flex h-fit items-center gap-x-0.5">
								<div className="cursor-grab px-1 rounded-lg transition-colors duration-150 cursor-not-allowed">
									<GripVertical className="size-6 text-muted-foreground opacity-50" />
								</div>

								<Checkbox
									disabled
									className="size-6"
								/>
							</div>

							<Textarea
								autoCapitalize="on"
								autoFocus
								value={title}
								onChange={e => handleTitleUpdate(e.target.value)}
								className="font-heading! rounded-none border-none bg-transparent p-0 text-lg/tight! font-medium transition-colors focus-visible:ring-0 align-middle"
							/>
						</div>
						<div className="flex items-center justify-between basis-full">
							<div className="flex items-center gap-x-2.5">
								<DropdownMenu
									open={datePopupOpen}
									onOpenChange={setDatePopupOpen}
								>
									<DropdownMenuTrigger
										className={cn(
											'grid place-content-center rounded-md border border-border px-3 py-0.5',
											'font-heading text-lg font-medium',
											'transition-[background-color,transform,opacity] duration-150',
											'hover:bg-muted/40',
											'active:scale-[0.98]',
											'data-[state=open]:bg-muted/60',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
										)}
									>
										<span>{formattedDate}</span>
									</DropdownMenuTrigger>

									<DropdownMenuContent
										onPointerDown={e => {
											e.preventDefault();
											e.stopPropagation();
										}}
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											selected={date ? new Date(date) : undefined}
											onSelect={handleDateUpdate}
										/>
									</DropdownMenuContent>
								</DropdownMenu>
								<DropdownMenu
									open={priorityPopupOpen}
									onOpenChange={setPriorityPopupOpen}
								>
									<DropdownMenuTrigger
										className={cn(
											'flex items-center justify-center rounded-md px-3 py-0.5 text-lg',
											'transition-[background-color,transform,opacity] duration-150',
											'hover:bg-muted/40',
											'active:scale-[0.98]',
											'data-[state=open]:bg-muted/60',
											'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
											styleClass,
										)}
									>
										<span>{priorityLabel}</span>
									</DropdownMenuTrigger>

									<DropdownMenuContent
										onPointerDown={e => {
											e.preventDefault();
											e.stopPropagation();
										}}
										className="bg-popover/90 flex min-w-44 flex-col gap-2 p-3"
									>
										{Object.keys(styleClass).map(key => {
											const current_priority = Number(key) as TPriority;

											return (
												<Button
													key={key}
													size="sm"
													onClick={() => handlePriorityUpdate(current_priority)}
													className={cn(
														'relative justify-start rounded-lg px-3 pr-9 text-base transition-colors',
														styleClass,
													)}
												>
													{priorityLabel}

													{current_priority === priority && <CheckCheck className="absolute right-3 size-4" />}
												</Button>
											);
										})}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<Trash
								onClick={() => reset()}
								className="
									size-6
									text-muted-foreground
									transition-[color,transform] duration-150
									hover:text-destructive
									hover:scale-105
									active:scale-95
								"
							/>
						</div>
					</TaskLayout>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
