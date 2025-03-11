import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://random-data-api.com/api/users/random_user?size=80'
      );
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      setLoading(false);
      console.error('Error fetching users:', err);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No users found.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentUser = users[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>User Information</Text>
            <Text style={styles.userCount}>
              {currentIndex + 1} of {users.length}
            </Text>
          </View>

          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          </View>

          <View style={styles.infoContainer}>
            <InfoItem label="ID" value={currentUser.id} />
            <InfoItem label="UID" value={currentUser.uid} />
            <InfoItem label="Password" value={currentUser.password} />
            <InfoItem label="First Name" value={currentUser.first_name} />
            <InfoItem label="Last Name" value={currentUser.last_name} />
            <InfoItem label="Username" value={currentUser.username} />
            <InfoItem label="Email" value={currentUser.email} />
          </View>
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[
              styles.navigationButton,
              currentIndex === 0 && styles.disabledButton,
            ]}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Text
              style={[
                styles.navigationButtonText,
                currentIndex === 0 && styles.disabledButtonText,
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.navigationButton,
              currentIndex === users.length - 1 && styles.disabledButton,
            ]}
            onPress={handleNext}
            disabled={currentIndex === users.length - 1}
          >
            <Text
              style={[
                styles.navigationButtonText,
                currentIndex === users.length - 1 && styles.disabledButtonText,
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userCount: {
    fontSize: 14,
    color: '#666',
  },
  avatarContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  infoContainer: {
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  infoValue: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    flex: 0.48,
    alignItems: 'center',
  },
  navigationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  disabledButtonText: {
    color: '#888888',
  },
});

export default UserScreen; 