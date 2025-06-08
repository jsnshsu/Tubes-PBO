// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",

  // User
  USER_PROFILE: "/api/user/profile",
  USER_LISTINGS: "/api/user/listings",

  // Products
  PRODUCTS: "/api/products",
  PRODUCT_DETAIL: (id) => `/api/products/${id}`,
  RELATED_PRODUCTS: "/api/products/related",

  // Listings
  LISTINGS: "/api/listings",
  LISTING_DETAIL: (id) => `/api/listings/${id}`,

  // Transactions
  TRANSACTIONS: "/api/transactions",
  TRANSACTION_DETAIL: (id) => `/api/transactions/${id}`,
  PAYMENT_PROOF: (id) => `/api/transactions/${id}/payment`,

  // Notifications
  NOTIFICATIONS: "/api/notifications",

  // Auction
  AUCTION_BIDS: (id) => `/api/auctions/${id}/bids`,
  PLACE_BID: (id) => `/api/auctions/${id}/bid`,

  // File Upload
  UPLOAD_IMAGE: "/api/upload/image",
}

// HTTP Client with automatic token handling
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)

      // Handle authentication errors
      if (response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/login"
        throw new Error("Authentication required")
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: "GET" })
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" })
  }

  async uploadFile(endpoint, formData) {
    const token = localStorage.getItem("token")
    return this.request(endpoint, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData, let browser set it
      },
      body: formData,
    })
  }
}

export const apiClient = new ApiClient()
