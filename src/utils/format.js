// Formatting utilities
export const formatUtils = {
  // Format price to Indonesian Rupiah
  formatPrice(amount) {
    if (!amount && amount !== 0) return "Rp 0,-"
    return `Rp ${Number(amount).toLocaleString("id-ID")},-`
  },

  // Format date to Indonesian format
  formatDate(dateString) {
    if (!dateString) return "-"

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "-"
    }
  },

  // Format datetime to Indonesian format
  formatDateTime(dateString) {
    if (!dateString) return "-"

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    } catch (error) {
      console.error("Error formatting datetime:", error)
      return "-"
    }
  },

  // Parse price string to number
  parsePrice(priceString) {
    if (!priceString) return 0
    return Number(priceString.replace(/[^\d]/g, ""))
  },

  // Truncate text
  truncateText(text, maxLength = 100) {
    if (!text) return ""
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  },
}
