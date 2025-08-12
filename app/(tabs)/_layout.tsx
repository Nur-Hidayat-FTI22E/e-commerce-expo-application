import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={({ route }: { route: { name: string } }) => ({
				headerShown: false,
				tabBarActiveTintColor: '#E53935',
				tabBarInactiveTintColor: '#888',
				tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 8 },
				tabBarIcon: ({ color, size }: { color: string; size: number }) => {
					let iconName: React.ComponentProps<typeof Feather>['name'] = 'home';
					if (route.name === 'shop') iconName = 'shopping-cart';
					if (route.name === 'bag') iconName = 'shopping-bag';
					return <Feather name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tabs.Screen name="home" options={{ title: 'Home' }} />
			<Tabs.Screen name="shop" options={{ title: 'Shop' }} />
			<Tabs.Screen name="bag" options={{ title: 'Bag' }} />
		</Tabs>
	);
}