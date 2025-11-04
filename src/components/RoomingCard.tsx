import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { FileCheckCornerIcon, Calendar1Icon } from "lucide-react";
import { RoomingList } from "../types/rooming";
import { formatCutOffDate, formatDateRange } from "@/lib/helpers";

interface RoomingCardProps {
  roomingList: RoomingList;
}


export default function RoomingCard({ roomingList }: RoomingCardProps) {
  const dateRange = formatDateRange(roomingList.bookings);
  const { month, day } = formatCutOffDate(roomingList.cutOffDate);

  return (
    <Card className="bg-white rounded-xl shadow-md p-4 relative">
      <div className="absolute top-4 right-4  rounded-lg px-3 py-2 text-center">
        <div className="border-2 rounded-md">
          <div className="text-sm font-bold text-blue-800 bg-blue-200">{month}</div>
          <div className="text-lg font-bold text-blue-800 bg-blue-50">{day}</div>
        </div>
        <p className="text-xs ">Cut-Off Date</p>
      </div>

      <div className="pr-20">
        <h2 className="text-xl font-bold mb-1">{roomingList.rfpName}</h2>
        <p className="text-sm text-gray-600 mb-3">
          Agreement: <strong>{roomingList.agreement_type}</strong>
        </p>
        <div className="flex items-center text-sm text-gray-700 mt-8">
          <span className="mr-2"><Calendar1Icon /></span>
          {dateRange}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="default" className="flex-1 mr-2" aria-label="View bookings">
          View Bookings ({roomingList.bookings.length})
        </Button>
        <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" aria-label="Submit">
          <FileCheckCornerIcon />
        </Button>
      </div>
    </Card>
  );
}
