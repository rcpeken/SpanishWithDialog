import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../atoms/Text';
import { colors } from '../../theme/colors';
import { borderRadius, spacing } from '../../theme/spacing';
import { Topic, TopicIconColor, TopicIconName } from '../../types';

interface TopicCardProps {
  topic: Topic;
  onPress?: () => void;
  onDelete?: () => void;
}

const iconColorMap: Record<TopicIconColor, string> = {
  orange: '#F59E0B',
  blue: '#3B82F6',
  green: '#10B981',
  purple: '#8B5CF6',
  red: '#EF4444',
  teal: '#14B8A6',
};

const iconBackgroundMap: Record<TopicIconColor, string> = {
  orange: 'rgba(245, 158, 11, 0.15)',
  blue: 'rgba(59, 130, 246, 0.15)',
  green: 'rgba(16, 185, 129, 0.15)',
  purple: 'rgba(139, 92, 246, 0.15)',
  red: 'rgba(239, 68, 68, 0.15)',
  teal: 'rgba(20, 184, 166, 0.15)',
};

const getIconName = (icon: TopicIconName): keyof typeof Ionicons.glyphMap => {
  const iconMap: Record<TopicIconName, keyof typeof Ionicons.glyphMap> = {
    cafe: 'cafe',
    briefcase: 'briefcase',
    map: 'map',
    cart: 'cart',
    airplane: 'airplane',
    restaurant: 'restaurant',
    chatbubbles: 'chatbubbles',
    medkit: 'medkit',
    home: 'home',
    school: 'school',
  };
  return iconMap[icon];
};

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onPress, onDelete }) => {
  const { title, icon, iconColor, dialogueCount, lastAccessed } = topic;
  const iconTint = iconColorMap[iconColor];
  const iconBg = iconBackgroundMap[iconColor];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <Ionicons
          name={getIconName(icon)}
          size={24}
          color={iconTint}
        />
      </View>

      <View style={styles.content}>
        <Text variant="h4" color={colors.text.primary}>
          {title}
        </Text>
        <View style={styles.meta}>
          <View style={styles.badge}>
            <Text variant="labelSmall" color={colors.text.secondary}>
              {dialogueCount} Dialogues
            </Text>
          </View>
          <Text variant="bodySmall" color={colors.text.muted}>
            • {lastAccessed}
          </Text>
        </View>
      </View>

      {onDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="trash-outline" size={20} color={colors.status.error} />
        </TouchableOpacity>
      )}

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.text.muted}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.dark,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  content: {
    flex: 1,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  badge: {
    backgroundColor: colors.background.cardHover,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  deleteButton: {
    padding: spacing.sm,
    marginRight: spacing.xs,
  },
});
