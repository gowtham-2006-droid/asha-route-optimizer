import axios from 'axios';
import { MOCK_WORKER, MOCK_PATIENTS, MOCK_ROUTE_STOPS, MOCK_SUPERVISOR_KPIS, MOCK_AI_EXPLANATIONS } from './mockData';

// API Base URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Interceptor to attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('asha_jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Helper wrapper with seamless fallback to mock data when backend is unreachable
async function safeApiCall(apiCallFn, fallbackData) {
  try {
    const response = await apiCallFn();
    if (response.data && response.data.success) {
      return { data: response.data.data, isMock: false };
    }
    return { data: response.data, isMock: false };
  } catch (err) {
    console.warn(`[API Client] Backend service unavailable at ${API_BASE_URL}. Falling back to client-side mock data.`, err.message);
    return { data: fallbackData, isMock: true };
  }
}

export const authService = {
  requestOtp: async (phone) => {
    return safeApiCall(
      () => apiClient.post('/auth/request-otp', { phone }),
      { message: 'OTP sent successfully (Mock)', expires_in_seconds: 300 }
    );
  },

  verifyOtp: async (phone, otp, role = 'asha_worker') => {
    return safeApiCall(
      () => apiClient.post('/auth/verify-otp', { phone, otp }),
      {
        token: `mock_jwt_token_${Date.now()}`,
        expires_in: 43200,
        user: {
          user_id: role === 'asha_worker' ? 'usr_w101' : 'usr_sup01',
          name: role === 'asha_worker' ? MOCK_WORKER.name : 'Dr. Radhika Rao (Medical Officer)',
          phone,
          role,
          phc_id: 'phc_ramanthapur_01'
        }
      }
    );
  }
};

export const patientService = {
  getPatients: async (params = {}) => {
    return safeApiCall(
      () => apiClient.get('/patients', { params }),
      MOCK_PATIENTS
    );
  },

  getPatientById: async (id) => {
    return safeApiCall(
      () => apiClient.get(`/patients/${id}`),
      MOCK_PATIENTS.find(p => p.patient_id === id) || MOCK_PATIENTS[0]
    );
  },

  createPatient: async (patientData) => {
    return safeApiCall(
      () => apiClient.post('/patients', patientData),
      { ...patientData, patient_id: `pat_${Math.floor(100 + Math.random() * 900)}` }
    );
  }
};

export const routeService = {
  getTodayRoute: async (workerId) => {
    return safeApiCall(
      () => apiClient.get(`/routes/${workerId}/today`),
      {
        route_id: 'rte_20260731_w101',
        total_distance_km: 8.4,
        stops: MOCK_ROUTE_STOPS
      }
    );
  },

  emergencyReroute: async (emergencyData) => {
    return safeApiCall(
      () => apiClient.post('/routes/emergency-reroute', emergencyData),
      {
        reoptimized_route_id: `rte_emergency_${Date.now()}`,
        emergency_inserted_at_sequence: 1,
        stops: MOCK_ROUTE_STOPS
      }
    );
  }
};

export const aiService = {
  explainPriority: async (patientId) => {
    return safeApiCall(
      () => apiClient.post('/ai/explain-priority', { patient_id: patientId }),
      { explanation: MOCK_AI_EXPLANATIONS[patientId] || 'Priority calculated by XGBoost risk model.' }
    );
  },

  generateReport: async (workerId, date) => {
    return safeApiCall(
      () => apiClient.post('/ai/generate-report', { worker_id: workerId, date }),
      {
        report_id: `rep_${Date.now()}`,
        title: 'Daily Field Visit Summary Report',
        metrics: MOCK_SUPERVISOR_KPIS
      }
    );
  }
};

export default apiClient;
