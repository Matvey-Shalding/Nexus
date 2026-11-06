import { useTaskView } from '@/features/tasks/store/task.store';
import { useEffect, useState } from 'react';

export const useHydration = () => {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const unsubHydrate = useTaskView.persist.onHydrate(() => setHydrated(false));

		const unsubFinishHydration = useTaskView.persist.onFinishHydration(() => setHydrated(true));

		setHydrated(useTaskView.persist.hasHydrated());

		return () => {
			unsubHydrate();
			unsubFinishHydration();
		};
	}, []);

	return hydrated;
};
