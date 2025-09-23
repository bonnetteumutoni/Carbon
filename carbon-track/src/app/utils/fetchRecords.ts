const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Helper function to ensure baseUrl ends with a slash
function getFormattedBaseUrl(url: string | undefined): string {
  if (!url) return '';
  return url.endsWith('/') ? url : `${url}/`;
}

export async function fetchRecords() {
  try {
    const formattedBaseUrl = getFormattedBaseUrl(baseUrl);
    if (!formattedBaseUrl) throw new Error("API_URL is not defined");
    
    const response = await fetch(`${formattedBaseUrl}energy_entries`);
    if (!response.ok) {
      throw new Error("Something went wrong: " + response.statusText);
    }
    const result = await response.json();
    console.log("Fetched all records:", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch records: " + (error as Error).message);
  }
}

export async function saveRecord(data: any) {
  try {
    console.log("POST data:", JSON.stringify(data, null, 2));
    const formattedBaseUrl = getFormattedBaseUrl(baseUrl);
    if (!formattedBaseUrl) throw new Error("API_URL is not defined");
    
    const response = await fetch(`${formattedBaseUrl}energy_entries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("POST failed:", response.status, response.statusText, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }
    const result = await response.json();
    console.log("Save response:", result);
    return result;
  } catch (error) {
    console.error("Save error:", error);
    throw new Error("Failed to save record: " + (error as Error).message);
  }
}

export async function updateRecord(id: number, data: any) {
  try {
    console.log("PUT data for ID", id, ":", JSON.stringify(data, null, 2));
    const formattedBaseUrl = getFormattedBaseUrl(baseUrl);
    if (!formattedBaseUrl) throw new Error("API_URL is not defined");
    
    const response = await fetch(`${formattedBaseUrl}energy_entries/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("PUT failed:", response.status, response.statusText, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
    }
    const result = await response.json();
    console.log("Update response:", result);
    return result;
  } catch (error) {
    console.error("Update error:", error);
    throw new Error("Failed to update record: " + (error as Error).message);
  }
}