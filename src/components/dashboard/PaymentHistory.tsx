
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const transactions = [
  {
    id: "TX123",
    date: "2025-03-10",
    amount: "200 FCFA",
    status: "Succès",
    method: "Orange Money",
    description: "Contrat de service - Thème premium"
  },
  {
    id: "TX124",
    date: "2025-03-09",
    amount: "200 FCFA",
    status: "Succès",
    method: "Wave",
    description: "Contrat de travail - Thème premium"
  }
];

const PaymentHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des paiements</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.id}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.method}</TableCell>
                <TableCell>{tx.status}</TableCell>
                <TableCell>{tx.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
