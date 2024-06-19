import { Client, Account, ID, Databases, Query, Storage, Avatars, Graphql } from "react-native-appwrite";
import React, { useState } from "react";

export const Config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.earthswap',
    projectId: '665764190015e62cbf28',
    databaseId: '665766e30037eeb04e05',
    userCollectionId: '665766fe000fe458fc7c',
    storageId: '6657680d0038482da1a7',
};

const client = new Client();

client
    .setEndpoint(Config.endpoint) // Your Appwrite Endpoint
    .setProject(Config.projectId) // Your project ID
    .setPlatform(Config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const deleteCurrentSession = async () => {
  try {
    const currentSession = await account.getSession('current');
    await account.deleteSession(currentSession.$id);
  } catch (error) {
    console.log('No active session to delete.');
  }
};

export const createUser = async (email, password, username) => {
  try {
    await deleteCurrentSession();

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
  
    if (!newAccount) throw Error;
  
    const avatarUrl = avatars.getInitials(username);
  
    await signIn(email, password);
  
    const newUser = await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
  
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}
  
  // Sign In
export const signIn = async (email, password) => {
  try {
    await deleteCurrentSession();
    const session = await account.createEmailPasswordSession(email, password);
  
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
  
    const currentUser = await databases.listDocuments(
      Config.databaseId,
      Config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
  
    if (!currentUser) throw Error;
  
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// In your lib/appwrite.js or wherever you have your API functions

export const getFollowersCount = async (userId) => {
  // Implement API call to fetch the followers count for the user
  // Return the followers count
  return 100; // Placeholder value
};

export const getListingsCount = async (userId) => {
  // Implement API call to fetch the listings count for the user
  // Return the listings count
  return 5; // Placeholder value
};
