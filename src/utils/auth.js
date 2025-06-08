// Authentication utilities
export const authUtils = {
  // Get current user from localStorage
  getCurrentUser() {
    try {
      const user = localStorage.getItem("user")
      return user ? JSON.parse(user) : null
    } catch (error) {
      console.error("Error parsing user data:", error)
      return null
    }
  },

  // Get auth token
  getToken() {
    return localStorage.getItem("token")
  },

  // Set user and token
  setAuth(user, token) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", token)
  },

  // Clear auth data
  clearAuth() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken()
  },

  // Logout user
  logout() {
    this.clearAuth()
    window.location.href = "/"
  },
}
