// These are only here because of the use of mock data.
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import React from 'react';
import { FilterOptions, RootStackScreenProps } from '../types';
import { SafeAreaView } from '../components/styles/elements/SafeAreaView';
import { Heading } from '../components/styles/elements/Heading';
import FilterPill from '../components/Home/FilterPill';
import { useStore } from '../stores/useStore';
import { ScrollView } from 'react-native-gesture-handler';
import theme from '../components/styles/theme';
import mockKayakData from '../data/mockKayakData';
import KayakCard from '../components/Home/KayakCard';
import { Flatlist } from '../components/styles/elements/Flatlist';

const Homescreen = ({
	navigation,
	route,
}: RootStackScreenProps<'Homescreen'>) => {
	const selectedFilter = useStore().selectedFilter;
	const setSelectedFilter = useStore().setSelectedFilter;
	const filteredKayaks = useStore().filterKayaks(mockKayakData);

	return (
		<SafeAreaView marginX={'20px'}>
			<Heading
				fontSize={35}
				fontWeight={'bold'}
				marginBottom={theme.space.medium}
			>
				Vind je kajak
			</Heading>
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{Object.keys(FilterOptions).map((filterOption) => (
					<FilterPill
						key={filterOption}
						label={filterOption}
						onPress={() =>
							setSelectedFilter(filterOption as FilterOptions)
						}
						isSelected={selectedFilter === filterOption}
					/>
				))}
			</ScrollView>
			<Flatlist
				mt={theme.space.medium}
				data={filteredKayaks}
				renderItem={({ item }) => (
					<KayakCard
						image={item.image}
						title={item.name}
						onPress={() => console.log(`Pressed ${item.name}`)}
					/>
				)}
				keyExtractor={(item) => item.name}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
};

export default Homescreen;