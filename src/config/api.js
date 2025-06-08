// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"

// Import mock data untuk development
import { mockAPI, mockData } from "../services/mockData"

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

// Development mode flag
const isDevelopment = import.meta.env.DEV || !API_BASE_URL.includes("http")

// Mock API responses untuk development
const mockResponses = {
  [API_ENDPOINTS.LOGIN]: async (data) => {
    await mockAPI.delay()
    const user = mockAPI.findUser(data.email, data.password)

    if (user) {
      const { password, ...userWithoutPassword } = user
      return {
        success: true,
        data: {
          user: userWithoutPassword,
          token: `mock-token-${user.id}-${Date.now()}`,
        },
      }
    } else {
      throw new Error("Email atau password salah")
    }
  },

  [API_ENDPOINTS.REGISTER]: async (data) => {
    await mockAPI.delay()

    // Check if email already exists
    if (mockAPI.findUserByEmail(data.email)) {
      throw new Error("Email sudah terdaftar")
    }

    // Check if username already exists
    if (mockAPI.findUserByUsername(data.username)) {
      throw new Error("Username sudah digunakan")
    }

    const newUser = mockAPI.addUser(data)
    const { password, ...userWithoutPassword } = newUser

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token: `mock-token-${newUser.id}-${Date.now()}`,
      },
    }
  },

  [API_ENDPOINTS.PRODUCTS]: async (params) => {
    await mockAPI.delay()
    const products = mockAPI.getProducts(params)
    return {
      success: true,
      data: {
        content: products,
        total: products.length,
      },
    }
  },

  [API_ENDPOINTS.USER_PROFILE]: async () => {
    await mockAPI.delay()
    const userId = getCurrentUserId()
    const user = mockData.users.find((u) => u.id === userId)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return {
        success: true,
        data: userWithoutPassword,
      }
    }
    throw new Error("User not found")
  },

  [API_ENDPOINTS.USER_LISTINGS]: async () => {
    await mockAPI.delay()
    const userId = getCurrentUserId()
    const listings = mockAPI.getUserListings(userId)
    return {
      success: true,
      data: listings,
    }
  },

  [API_ENDPOINTS.TRANSACTIONS]: async () => {
    await mockAPI.delay()
    const userId = getCurrentUserId()
    const transactions = mockAPI.getUserTransactions(userId)
    return {
      success: true,
      data: transactions,
    }
  },

  [API_ENDPOINTS.NOTIFICATIONS]: async () => {
    await mockAPI.delay()
    const userId = getCurrentUserId()
    const notifications = mockAPI.getUserNotifications(userId)
    return {
      success: true,
      data: notifications,
    }
  },
}

// Helper function to get current user ID from token
function getCurrentUserId() {
  const token = localStorage.getItem("token")
  if (token && token.startsWith("mock-token-")) {
    const parts = token.split("-")
    return Number.parseInt(parts[2])
  }
  return 1 // Default user ID for development
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
    // Use mock data in development mode
    if (isDevelopment) {
      return this.mockRequest(endpoint, options)
    }

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

  async mockRequest(endpoint, options = {}) {
    try {
      // Parse query parameters
      const [path, queryString] = endpoint.split("?")
      const params = {}
      if (queryString) {
        queryString.split("&").forEach((param) => {
          const [key, value] = param.split("=")
          params[decodeURIComponent(key)] = decodeURIComponent(value)
        })
      }

      // Handle dynamic endpoints
      const mockEndpoint = path

      // Handle product detail endpoints
      if (path.startsWith("/api/products/") && path !== "/api/products/related") {
        const id = Number.parseInt(path.split("/")[3])
        const product = mockData.products.find((p) => p.id === id)
        if (product) {
          return { success: true, data: product }
        }
        throw new Error("Product not found")
      }

      // Handle listing detail endpoints
      if (path.startsWith("/api/listings/") && !path.includes("/payment")) {
        const id = Number.parseInt(path.split("/")[3])
        const listing = mockData.listings.find((l) => l.id === id)
        if (listing) {
          return { success: true, data: listing }
        }
        throw new Error("Listing not found")
      }

      // Handle transaction detail endpoints
      if (path.startsWith("/api/transactions/") && !path.includes("/payment")) {
        const id = Number.parseInt(path.split("/")[3])
        const transaction = mockData.transactions.find((t) => t.id === id)
        if (transaction) {
          return { success: true, data: transaction }
        }
        throw new Error("Transaction not found")
      }

      // Handle auction bids endpoints
      if (path.includes("/api/auctions/") && path.includes("/bids")) {
        const id = Number.parseInt(path.split("/")[3])
        const bids = mockAPI.getProductBids(id)
        return { success: true, data: bids }
      }

      // Handle related products
      if (path === "/api/products/related") {
        const relatedProducts = mockData.products.slice(0, 3)
        return { success: true, data: relatedProducts }
      }

      // Check if we have a mock response for this endpoint
      if (mockResponses[mockEndpoint]) {
        const data = options.body ? JSON.parse(options.body) : params
        return await mockResponses[mockEndpoint](data)
      }

      // Default success response for unhandled endpoints
      return { success: true, data: {} }
    } catch (error) {
      console.error("Mock API request failed:", error)
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
