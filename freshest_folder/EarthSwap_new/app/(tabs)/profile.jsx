import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { getCurrentUser } from '../lib/appwrite'; // Import the getCurrentUser function

const Profile = () => {
    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [listingsCount, setListingsCount] = useState(0);
    const [listings, setListings] = useState([]); // State to store user's listings

    useEffect(() => {
        // Fetch current user information when component mounts
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
                
                // Fetch followers and listings count here
                const followersCount = await getFollowersCount(currentUser.id); // Assume you have this function
                const countOfListings = await getListingsCount(currentUser.id); // Assume you have this function

                setFollowers(followersCount);
                setListingsCount(countOfListings);

                // Fetch user's listings
                const userListingItems = await getUserListings(currentUser.id); // Assume you have this function
                setListings(userListingItems);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image for profile picture
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{user ? user.username : 'Loading...'}</Text>
                {/* Display loading text if user data is still being fetched */}
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{followers}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{listingsCount}</Text>
                    <Text style={styles.statLabel}>Listings</Text>
                </View>
            </View>
            <View style={styles.listingsContainer}>
                <Text style={styles.listingsHeading}>Your Listings</Text>
                {listings.map((listing) => (
                    <View key={listing.id} style={styles.listingItem}>
                        <Image
                            source={{ uri: listing.image }} // Listing image URL
                            style={styles.listingImage}
                        />
                        <Text style={styles.listingTitle}>{listing.title}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

// Example function to fetch user's listings
const getUserListings = async (userId) => {
    // Replace this with your actual logic to fetch user's listings
    return [
        {
            id: '1',
            title: 'Doraemon phonecase Iphone 15 Plus',
            image: 'https://drive.google.com/uc?export=view&id=1IAoEb9-jl8ggfP1aCKiEXg6ZNQshxNDk',
        },
        {
            id: '2',
            title: 'Sanrio keychains',
            image: 'https://drive.google.com/uc?export=view&id=1aZ7lIjvs33qILBHIHgJyEWY2HRoHspE0',
        },
        // Add more listings as needed
    ];
};

// Example function to fetch followers count
const getFollowersCount = async (userId) => {
    // Replace this with your actual logic to fetch followers count
    return 42; // Dummy data
};

// Example function to fetch listings count
const getListingsCount = async (userId) => {
    // Replace this with your actual logic to fetch listings count
    return 10; // Dummy data
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 80,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    listingsContainer: {
        width: '90%',
    },
    listingsHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    listingImage: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginRight: 10,
    },
    listingTitle: {
        fontSize: 16,
    },
});

export default Profile;

  

