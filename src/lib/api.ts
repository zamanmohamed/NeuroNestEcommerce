const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export type ConsultationPayload = {
  fullName: string;
  email: string;
  phone: string;
  businessName?: string;
  message?: string;
  locale?: "en" | "si";
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function submitConsultation(
  payload: ConsultationPayload,
): Promise<{ id: string; message: string }> {
  const response = await fetch(`${API_BASE_URL}/consultations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as ApiResponse<{
    id: string;
    message: string;
  }>;

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.error ?? "Failed to submit consultation request");
  }

  return result.data;
}
