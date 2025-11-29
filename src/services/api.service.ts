/**
 * API Service
 * 
 * Service for making API calls.
 */

import { config } from '@/config';

const API_URL = config.apiUrl;

/**
 * Generic API service class
 * 
 * Provides methods for making HTTP requests to the backend API.
 */
class ApiService {
  /**
   * Make a GET request
   * 
   * @param endpoint - API endpoint
   * @param token - Optional JWT token for authentication
   * @returns Promise with response data
   */
  async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Make a POST request
   * 
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param token - Optional JWT token for authentication
   * @returns Promise with response data
   */
  async post<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Make a PUT request
   * 
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param token - Optional JWT token for authentication
   * @returns Promise with response data
   */
  async put<T>(endpoint: string, data: unknown, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Make a DELETE request
   * 
   * @param endpoint - API endpoint
   * @param token - Optional JWT token for authentication
   * @returns Promise with response data
   */
  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const apiService = new ApiService();

