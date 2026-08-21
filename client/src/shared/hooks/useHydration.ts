import { useTaskView } from '@/features/tasks/store/task.store';
import { useEffect, useState } from 'react';

export const useHydration = () => {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		// Note: This is just in case you want to take into account manual rehydration.
		// You can remove the following line if you don't need it.
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
