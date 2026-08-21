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
			className="w-full"
		>
			<Button
				variant="ghost"
				onClick={handleClick}
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
	);
};
