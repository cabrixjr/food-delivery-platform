import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

const HotelCard = ({ hotel }) => {
  const handleCall = () => {
    if (hotel.contact_phone) {
      Linking.openURL(`tel:${hotel.contact_phone}`);
    }
  };

  return (
    <View style={styles.card}>
      {hotel.interior_images && hotel.interior_images[0] ? (
        <Image source={{ uri: hotel.interior_images[0] }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>No Photo Available</Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{hotel.business_name}</Text>
          <Text style={styles.distanceBadge}>{hotel.distance_km} km</Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {hotel.description || hotel.address_text}
        </Text>

        <View style={styles.badgeContainer}>
          <View style={[styles.badge, hotel.offers_delivery ? styles.activeBadge : styles.inactiveBadge]}>
            <Text style={styles.badgeText}>
              {hotel.offers_delivery ? '🚚 Delivery Available' : 'No Delivery'}
            </Text>
          </View>

          <View style={[styles.badge, hotel.takes_orders ? styles.orderBadge : styles.inactiveBadge]}>
            <Text style={styles.badgeText}>
              {hotel.takes_orders ? '🛍️ Taking Orders' : 'Closed'}
            </Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callButtonText}>📞 Call {hotel.contact_phone}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  placeholderImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  distanceBadge: {
    backgroundColor: '#FEF2F2',
    color: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeBadge: {
    backgroundColor: '#DCFCE7',
  },
  orderBadge: {
    backgroundColor: '#DBEAFE',
  },
  inactiveBadge: {
    backgroundColor: '#F3F4F6',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
  },
  footerRow: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  callButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default HotelCard;