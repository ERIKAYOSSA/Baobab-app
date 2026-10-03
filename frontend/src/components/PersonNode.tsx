import {
  Calendar,
  BadgeCheck
} from "lucide-react";

type PersonNodeProps = {
  name: string;
  photo: string;
  birthYear?: string;
};

export function PersonNode({
  name,
  photo,
  birthYear
}: PersonNodeProps) {
  return (
    <div
      style={{
        width: 220,
        background: "#ffffff",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        textAlign: "center"
      }}
    >
      {photo}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6
        }}
      >
        <h3
          style={{
            margin: 0
          }}
        >
          {name}
        </h3>

        <BadgeCheck
          size={16}
          color="#2563eb"
        />
      </div>

      <div
        style={{
          marginTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          color: "#6b7280"
        }}
      >
        <Calendar size={14} />
        <span>{birthYear}</span>
      </div>
    </div>
  );
}