import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

interface Props {
	handleClick: () => void;
}

export const AddTaskButton: React.FC<Props> = ({ handleClick }) => {
	return (
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
				onClick={handleClick}
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
	);
};
