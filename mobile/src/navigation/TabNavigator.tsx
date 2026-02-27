import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DiscoverScreen } from '../features/discover';
import { LibraryScreen } from '../features/library';
import { colors } from '../theme/colors';
import { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabIconName = 'search' | 'search-outline' | 'book' | 'book-outline';

const getTabIcon = (routeName: string, focused: boolean): TabIconName => {
  switch (routeName) {
    case 'Discover':
      return focused ? 'search' : 'search-outline';
    case 'Library':
      return focused ? 'book' : 'book-outline';
    default:
      return 'search-outline';
  }
};

export const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 8);

  return (
    <Tab.Navigator
      initialRouteName="Discover"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabIcon(route.name, focused);
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.muted,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.border.dark,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: 60 + bottomPadding,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
};
