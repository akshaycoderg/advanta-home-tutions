import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Advanta Home Tutions — personalised home tuition in Varanasi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  let logo: string | null = null;
  try {
    const file = await readFile(path.join(process.cwd(), "public/images/logo-full.png"));
    logo = `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    logo = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#041A33",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(21,89,183,0.38)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: 120,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(254,111,9,0.18)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {logo ? (
            <div
              style={{
                display: "flex",
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "10px 18px",
                width: 260,
                height: 120,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="" width={230} height={104} style={{ objectFit: "contain" }} />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "18px 24px",
                color: "#003F7E",
                fontSize: 40,
                fontWeight: 800,
              }}
            >
              Advanta Home Tutions
            </div>
          )}
          <div
            style={{
              display: "flex",
              background: "rgba(254,111,9,0.16)",
              border: "1px solid rgba(254,111,9,0.5)",
              color: "#FFD0A8",
              borderRadius: 9999,
              padding: "10px 20px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            Home tuition in Varanasi
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 940 }}>
          <div
            style={{
              display: "flex",
              color: "#FFFFFF",
              fontSize: 62,
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: -1.5,
            }}
          >
            Find the right home tutor for your child
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              color: "#C5DAEF",
              fontSize: 28,
              lineHeight: 1.45,
            }}
          >
            Personalised one-to-one learning in Varanasi. Tell us the class, board and subjects.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 22,
            color: "#93B9DD",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>Your Child&apos;s Success, Our Commitment</div>
          <div style={{ display: "flex", color: "#FFB070", fontWeight: 700 }}>
            Advanta Home Tutions
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
