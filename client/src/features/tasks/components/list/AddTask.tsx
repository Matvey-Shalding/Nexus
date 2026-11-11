'use client';

import { cn } from '@/lib/utils';
import { Calendar } from '@/shared/components/Calendar';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/ui/dropdown-menu';
import { Input } from '@/shared/ui/input';
import { CheckCheck, ChevronsUpDown, GripVertical, Plus, Trash } from 'lucide-react';
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
				>
					<Button
						variant="ghost"
						className="
        group
        flex min-h-14 w-full items-center justify-start
        rounded-none
        border-b border-border
        border-x-0 border-t-0!
        py-2 pl-3.5
        transition-colors duration-150
        hover:bg-muted/40
      "
						onClick={() => setMode('focused')}
					>
						<Plus
							className="
          mr-1 size-5
          text-muted-foreground/60
          transition-[transform,color] duration-150
          group-hover:scale-105
          group-hover:text-muted-foreground
        "
						/>

						<span
							className="
          text-lg text-muted-foreground/70
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
						<div className="border-border flex items-center gap-x-1 border-r py-2 pr-1">
							<div className="cursor-grab p-1 rounded-lg transition-colors duration-150 cursor-not-allowed">
								<GripVertical className="size-6 text-muted-foreground opacity-50" />
							</div>

							<Checkbox
								disabled
								className="size-6 mr-2"
							/>

							<Input
								autoCapitalize="on"
								autoFocus
								value={title}
								onChange={e => handleTitleUpdate(e.target.value)}
								className="font-heading! rounded-none border-none bg-transparent p-0 text-lg! font-medium transition-colors focus-visible:ring-0"
							/>
						</div>
						<DropdownMenu
							open={datePopupOpen}
							onOpenChange={setDatePopupOpen}
						>
							<DropdownMenuTrigger className="border-border w-full border-r flex items-center justify-between p-2.5 group">
								<span className="font-heading text-lg font-medium">{formattedDate}</span>
								<ChevronsUpDown
									className={cn(
										'text-muted-foreground size-4.5 transition-[transform_color] duration-300 group-hover:text-foreground',
										datePopupOpen ? 'rotate-180' : 'rotate-0',
									)}
								/>
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
							<DropdownMenuTrigger className="border-border flex items-center group justify-center gap-x-4 border-r py-2 px-2.5">
								<span
									className={cn(
										'h-full shrink basis-full rounded-lg text-lg transition-colors flex items-center justify-center',
										styleClass,
									)}
								>
									{priorityLabel}
								</span>
								<ChevronsUpDown
									className={cn(
										'text-muted-foreground size-4.5 min-w-4.5 transition-[transform_color] duration-300 group-hover:text-foreground',
										priorityPopupOpen ? 'rotate-180' : 'rotate-0',
									)}
								/>
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
						<div
							onClick={() => reset()}
							className="group hover:bg-muted/40 grid place-content-center py-3 transition-colors duration-300"
						>
							<Trash className="group-hover:text-destructive size-6 transition-colors duration-300" />
						</div>
					</TaskLayout>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
