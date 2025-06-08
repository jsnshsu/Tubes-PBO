// Mock Data Service untuk development
export const mockData = {
  // Users data dengan password
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // Password untuk testing
      username: "johndoe",
      phone: "08123456789",
      address: "Jakarta, Indonesia",
      bank: "BCA",
      accountName: "John Doe",
      accountNumber: "1234567890",
      createdAt: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password123", // Password untuk testing
      username: "janesmith",
      phone: "08987654321",
      address: "Bandung, Indonesia",
      bank: "BNI",
      accountName: "Jane Smith",
      accountNumber: "0987654321",
      createdAt: "2024-01-16T10:00:00Z",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@ezbid.com",
      password: "admin123", // Password untuk admin
      username: "admin",
      phone: "08111222333",
      address: "Surabaya, Indonesia",
      bank: "Mandiri",
      accountName: "Admin User",
      accountNumber: "1122334455",
      createdAt: "2024-01-10T10:00:00Z",
    },
    {
      id: 4,
      name: "Test User",
      email: "test@example.com",
      password: "test123", // Password untuk testing
      username: "testuser",
      phone: "08555666777",
      address: "Yogyakarta, Indonesia",
      bank: "BRI",
      accountName: "Test User",
      accountNumber: "5566778899",
      createdAt: "2024-01-20T10:00:00Z",
    },
  ],

  // Products data
  products: [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      category: "Elektronik",
      basePrice: 15000000,
      currentPrice: 16500000,
      increment: 500000,
      startDate: "2024-12-01T10:00:00Z",
      endDate: "2024-12-15T18:00:00Z",
      description: "iPhone 14 Pro Max 256GB, kondisi mulus, fullset dengan box dan charger original.",
      status: "Active",
      images: ["/placeholder.svg?height=300&width=300"],
      contactPerson: "08123456789",
      nickname: "iPhone Mulus",
      views: 245,
      shares: 12,
      sellerId: 1,
    },
    {
      id: 2,
      name: "MacBook Pro M2",
      category: "Elektronik",
      basePrice: 25000000,
      currentPrice: 26000000,
      increment: 1000000,
      startDate: "2024-12-02T10:00:00Z",
      endDate: "2024-12-16T18:00:00Z",
      description: "MacBook Pro 13 inch dengan chip M2, RAM 16GB, SSD 512GB. Kondisi sangat baik.",
      status: "Active",
      images: ["/placeholder.svg?height=300&width=300"],
      contactPerson: "08987654321",
      nickname: "MacBook Kencang",
      views: 189,
      shares: 8,
      sellerId: 2,
    },
    {
      id: 3,
      name: "Gaming Chair RGB",
      category: "Gaming",
      basePrice: 2000000,
      currentPrice: 2500000,
      increment: 250000,
      startDate: "2024-12-03T10:00:00Z",
      endDate: "2024-12-17T18:00:00Z",
      description: "Gaming chair dengan lampu RGB, sangat nyaman untuk gaming marathon.",
      status: "Active",
      images: ["/placeholder.svg?height=300&width=300"],
      contactPerson: "08111222333",
      nickname: "Kursi Gaming Keren",
      views: 156,
      shares: 5,
      sellerId: 3,
    },
    {
      id: 4,
      name: "Sony WH-1000XM4",
      category: "Audio",
      basePrice: 3000000,
      currentPrice: 3500000,
      increment: 200000,
      startDate: "2024-12-04T10:00:00Z",
      endDate: "2024-12-18T18:00:00Z",
      description: "Headphone wireless dengan noise cancelling terbaik di kelasnya.",
      status: "Active",
      images: ["/placeholder.svg?height=300&width=300"],
      contactPerson: "08555666777",
      nickname: "Headphone Premium",
      views: 134,
      shares: 7,
      sellerId: 4,
    },
    {
      id: 5,
      name: "Nike Air Jordan 1",
      category: "Fashion",
      basePrice: 1500000,
      currentPrice: 1800000,
      increment: 150000,
      startDate: "2024-12-05T10:00:00Z",
      endDate: "2024-12-19T18:00:00Z",
      description: "Sepatu Nike Air Jordan 1 original, size 42, kondisi 95%.",
      status: "Active",
      images: ["/placeholder.svg?height=300&width=300"],
      contactPerson: "08123456789",
      nickname: "Jordan Rare",
      views: 98,
      shares: 3,
      sellerId: 1,
    },
  ],

  // Transactions data
  transactions: [
    {
      id: 1,
      productId: 1,
      productName: "iPhone 14 Pro Max",
      buyerId: 2,
      sellerId: 1,
      totalAmount: 16500000,
      status: "Not Paid",
      contact: "08123456789",
      bank: "BCA",
      createdAt: "2024-12-10T15:30:00Z",
      seller: {
        name: "John Doe",
        accountNumber: "1234567890",
        bank: "BCA",
      },
    },
    {
      id: 2,
      productId: 2,
      productName: "MacBook Pro M2",
      buyerId: 3,
      sellerId: 2,
      totalAmount: 26000000,
      status: "Paid",
      contact: "08987654321",
      bank: "BNI",
      createdAt: "2024-12-09T14:20:00Z",
      seller: {
        name: "Jane Smith",
        accountNumber: "0987654321",
        bank: "BNI",
      },
    },
    {
      id: 3,
      productId: 3,
      productName: "Gaming Chair RGB",
      buyerId: 1,
      sellerId: 3,
      totalAmount: 2500000,
      status: "Pending",
      contact: "08111222333",
      bank: "Mandiri",
      createdAt: "2024-12-08T16:45:00Z",
      seller: {
        name: "Admin User",
        accountNumber: "1122334455",
        bank: "Mandiri",
      },
    },
  ],

  // Listings data (user's own listings)
  listings: [
    {
      id: 1,
      name: "iPhone 14 Pro Max",
      category: "Elektronik",
      basePrice: 15000000,
      currentPrice: 16500000,
      increment: 500000,
      startDate: "2024-12-01T10:00:00Z",
      endDate: "2024-12-15T18:00:00Z",
      description: "iPhone 14 Pro Max 256GB, kondisi mulus",
      status: "Active",
      userId: 1,
    },
    {
      id: 2,
      name: "iPad Pro 11 inch",
      category: "Elektronik",
      basePrice: 12000000,
      currentPrice: 12000000,
      increment: 500000,
      startDate: "2024-12-10T10:00:00Z",
      endDate: "2024-12-25T18:00:00Z",
      description: "iPad Pro dengan Apple Pencil",
      status: "Active",
      userId: 1,
    },
    {
      id: 3,
      name: "Vintage Camera",
      category: "Elektronik",
      basePrice: 5000000,
      currentPrice: 5000000,
      increment: 250000,
      startDate: "2024-12-05T10:00:00Z",
      endDate: "2024-12-20T18:00:00Z",
      description: "Kamera vintage koleksi pribadi",
      status: "Not Active",
      userId: 1,
    },
  ],

  // Notifications data
  notifications: [
    {
      id: 1,
      type: "Info",
      message: "Selamat datang di EzBid! Mulai lelang pertama Anda hari ini.",
      isRead: false,
      createdAt: "2024-12-10T10:00:00Z",
      userId: 1,
    },
    {
      id: 2,
      type: "Transaksi",
      message: "Pembayaran untuk iPhone 14 Pro Max telah diterima.",
      isRead: false,
      createdAt: "2024-12-10T14:30:00Z",
      userId: 1,
    },
    {
      id: 3,
      type: "Info",
      message: "Lelang MacBook Pro M2 akan berakhir dalam 2 jam.",
      isRead: true,
      createdAt: "2024-12-09T16:00:00Z",
      userId: 1,
    },
    {
      id: 4,
      type: "Transaksi",
      message: "Anda memenangkan lelang Gaming Chair RGB!",
      isRead: false,
      createdAt: "2024-12-08T18:00:00Z",
      userId: 1,
    },
  ],

  // Bids data
  bids: [
    {
      id: 1,
      productId: 1,
      userId: 2,
      amount: 16500000,
      createdAt: "2024-12-10T15:30:00Z",
    },
    {
      id: 2,
      productId: 1,
      userId: 3,
      amount: 16000000,
      createdAt: "2024-12-10T14:20:00Z",
    },
    {
      id: 3,
      productId: 2,
      userId: 3,
      amount: 26000000,
      createdAt: "2024-12-09T16:45:00Z",
    },
    {
      id: 4,
      productId: 2,
      userId: 1,
      amount: 25500000,
      createdAt: "2024-12-09T15:30:00Z",
    },
  ],
}

// Helper functions untuk mock API
export const mockAPI = {
  // Simulate API delay
  delay: (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Find user by email and password
  findUser: (email, password) => {
    return mockData.users.find((user) => user.email === email && user.password === password)
  },

  // Find user by email (for registration check)
  findUserByEmail: (email) => {
    return mockData.users.find((user) => user.email === email)
  },

  // Find user by username (for registration check)
  findUserByUsername: (username) => {
    return mockData.users.find((user) => user.username === username)
  },

  // Generate new user ID
  generateUserId: () => {
    return Math.max(...mockData.users.map((u) => u.id)) + 1
  },

  // Add new user
  addUser: (userData) => {
    const newUser = {
      id: mockAPI.generateUserId(),
      ...userData,
      createdAt: new Date().toISOString(),
    }
    mockData.users.push(newUser)
    return newUser
  },

  // Get products with filters
  getProducts: (filters = {}) => {
    let products = [...mockData.products]

    if (filters.category) {
      products = products.filter((p) => p.category === filters.category)
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      products = products.filter((p) => p.currentPrice >= min && p.currentPrice <= max)
    }

    return products
  },

  // Get user's listings
  getUserListings: (userId) => {
    return mockData.listings.filter((listing) => listing.userId === userId)
  },

  // Get user's transactions
  getUserTransactions: (userId) => {
    return mockData.transactions.filter(
      (transaction) => transaction.buyerId === userId || transaction.sellerId === userId,
    )
  },

  // Get user's notifications
  getUserNotifications: (userId) => {
    return mockData.notifications.filter((notification) => notification.userId === userId)
  },

  // Get product bids
  getProductBids: (productId) => {
    return mockData.bids
      .filter((bid) => bid.productId === Number.parseInt(productId))
      .sort((a, b) => b.amount - a.amount) // Sort by amount descending
  },
}

// Export default credentials untuk testing
export const testCredentials = {
  users: [
    {
      email: "john@example.com",
      password: "password123",
      name: "John Doe",
    },
    {
      email: "jane@example.com",
      password: "password123",
      name: "Jane Smith",
    },
    {
      email: "admin@ezbid.com",
      password: "admin123",
      name: "Admin User",
    },
    {
      email: "test@example.com",
      password: "test123",
      name: "Test User",
    },
  ],
}
