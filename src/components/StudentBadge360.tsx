
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Home, Book, Key, Wand, Award, Shield, Calendar, Info, Check, X } from "lucide-react";

// Slytherin/clean color palette
const slytherinBg = "bg-[#F1F0FB]"; // soft gray
const slytherinAccent = "text-[#1A1F2C]"; // dark purple for name/headings
const slytherinHouse = "bg-[#8E9196] text-white"; // neutral gray for Slytherin
const slytherinBorder = "border-[#9F9EA1]"; // silver, subtle
const specialPermBg = "bg-[#C8C8C9]/60"; // light gray for special-permission area

type StudentBadge360Props = {
  metadata: {
    access_level: string;
    approved_books: string[];
    house: string;
    name: string;
    prefect: boolean;
    restricted_books: string[];
    special_permission: {
      expiry: string;
      granted_by: string;
      purpose: string;
    };
    wand_core: string;
    year: number;
  };
};

const formatBook = (book: string) =>
  book
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

export const StudentBadge360 = ({ metadata }: StudentBadge360Props) => {
  const {
    name, house, year, prefect, wand_core, approved_books, restricted_books,
    access_level, special_permission
  } = metadata;

  return (
    <Card className={`${slytherinBg} ${slytherinBorder} border shadow-md max-w-md mx-auto animate-fade-in`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="flex flex-col items-center mr-3">
          <div className="rounded-full border-2 border-[#9F9EA1] bg-white w-14 h-14 flex items-center justify-center">
            <User className="w-8 h-8 text-[#403E43]" />
          </div>
          {prefect && (
            <Badge variant="secondary" className="mt-2 flex gap-1 items-center px-2.5 py-0.5 rounded-full text-xs">
              <Award className="w-3 h-3 mr-1" /> Prefect
            </Badge>
          )}
        </div>
        <div className="flex-1">
          <CardTitle className={`text-lg font-bold ${slytherinAccent}`}>{name}</CardTitle>
          <div className="flex gap-2 mt-1 items-center">
            <Badge className={`${slytherinHouse} font-semibold flex gap-1 items-center`}>
              <Home className="w-3 h-3 mr-1 opacity-70" />
              {house}
            </Badge>
            <Badge variant="outline" className="ml-2 flex gap-1 items-center">
              Year {year}
            </Badge>
            <Badge variant="outline" className="flex gap-1 items-center">
              <Wand className="w-3 h-3 opacity-70 mr-1" />
              {wand_core.replace(/_/g, " ")}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="flex flex-col gap-2 text-sm">
          {/* Access Level */}
          <div className="flex gap-2 items-center mt-1">
            <Shield className="w-4 h-4 text-[#9F9EA1]" />
            <span className="font-medium mr-2">Access Level:</span>
            <Badge variant="outline" className="flex gap-1 items-center">
              {access_level}
              {access_level === "special_permission" &&
                <Key className="w-3 h-3 ml-1 text-[#8E9196]" />}
            </Badge>
          </div>
          {/* Special Permission Details */}
          {access_level === "special_permission" && (
            <div className={`rounded-lg px-3 py-2 mt-1 mb-1 border ${slytherinBorder} ${specialPermBg} flex items-center gap-3`}>
              <Key className="w-4 h-4 text-[#403E43]" />
              <div className="flex flex-col text-xs text-[#1A1F2C]/90">
                <div>
                  <span className="font-semibold">Purpose:</span> {special_permission.purpose.replace(/_/g, " ")}
                </div>
                <div>
                  <span className="font-semibold">Granted by:</span> {special_permission.granted_by}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 opacity-70" />
                  <span className="ml-1 font-semibold">Expires:</span> {special_permission.expiry.replace(/_/g, " ")}
                </div>
              </div>
            </div>
          )}

          {/* Approved Books */}
          <div className="flex items-center gap-2 mt-1">
            <Check className="w-4 h-4 text-green-600" />
            <span className="font-medium mr-1">Approved Books:</span>
            <div className="flex flex-wrap gap-1">
              {approved_books.length === 0 ? (
                <span className="italic text-gray-500">None</span>
              ) : approved_books.map(book =>
                <Badge key={book} variant="secondary" className="flex gap-1 items-center">
                  <Book className="w-3 h-3 mr-1" />
                  {formatBook(book)}
                </Badge>
              )}
            </div>
          </div>

          {/* Restricted Books */}
          <div className="flex items-center gap-2 mt-1">
            <X className="w-4 h-4 text-red-500" />
            <span className="font-medium mr-1">Restricted Books:</span>
            <div className="flex flex-wrap gap-1">
              {restricted_books.length === 0 ? (
                <span className="italic text-gray-400">None</span>
              ) : restricted_books.map(book =>
                <Badge key={book} variant="destructive" className="flex gap-1 items-center bg-red-300 text-red-900">
                  <Book className="w-3 h-3 mr-1" />
                  {formatBook(book)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardDescription className="px-6 pb-3 pt-2 text-muted-foreground text-xs text-center">
        <Info className="w-3 h-3 inline mr-1 opacity-80" />
        This profile contains metadata-driven access information.
      </CardDescription>
    </Card>
  );
};
