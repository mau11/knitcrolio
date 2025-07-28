import { auth } from "@auth";
import { requireAuth } from "@lib/requireAuth";
import { NextResponse } from "next/server";

// Mock @auth module
jest.mock("@auth", () => ({
  auth: jest.fn(),
}));

describe("requireAuth", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns session when valid", async () => {
    const mockSession = {
      user: {
        id: "123",
        name: "Me",
        email: "test@example.com",
        image: "https://example.com/image.jpg",
      },
    };
    (auth as jest.Mock).mockResolvedValue(mockSession);

    const result = await requireAuth();

    expect(result).toEqual(mockSession);
  });

  it("returns 401 response when session is null", async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const result = await requireAuth();

    expect(result).toBeInstanceOf(NextResponse);
    const response = result as NextResponse;
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({ message: "Unauthorized" });
  });

  it("returns 401 response when session.user is missing", async () => {
    (auth as jest.Mock).mockResolvedValue({});

    const result = await requireAuth();

    expect(result).toBeInstanceOf(NextResponse);
    const response = result as NextResponse;
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({ message: "Unauthorized" });
  });

  it("returns 401 response when session.user.id is missing", async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { name: "No ID", email: "no_id@example.com" },
    });

    const result = await requireAuth();

    expect(result).toBeInstanceOf(NextResponse);
    const response = result as NextResponse;
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({ message: "Unauthorized" });
  });
});
