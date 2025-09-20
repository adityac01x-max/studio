
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileWarning, Trash2, Check, UserX } from 'lucide-react';
import Link from 'next/link';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

type ReportedMessage = {
  id: string;
  conversationId: string;
  messageContent: string;
  senderRole: string;
  reason: string;
  timestamp: Timestamp;
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState<ReportedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'reported-messages'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reportsData: ReportedMessage[] = [];
      querySnapshot.forEach((doc) => {
        reportsData.push({ id: doc.id, ...doc.data() } as ReportedMessage);
      });
      setReports(reportsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleResolve = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reported-messages', id));
      toast({
        title: 'Report Resolved',
        description: 'The report has been marked as resolved and removed.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not resolve the report. Please try again.',
      });
    }
  };
  
    const handleBanUser = (senderRole: string) => {
        toast({
            title: `Action: Ban User ${senderRole}`,
            description: "In a real app, this would trigger the user banning process.",
        });
    }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-headline text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileWarning className="w-8 h-8 text-destructive" />
            Chat Content Reports
          </h1>
          <p className="text-muted-foreground">
            Review messages flagged by the AI content moderation system.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Sender ID</TableHead>
                <TableHead>Flagged Message</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    Loading reports...
                  </TableCell>
                </TableRow>
              ) : reports.length > 0 ? (
                reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="text-xs">
                      {report.timestamp.toDate().toLocaleString()}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {report.senderRole}
                    </TableCell>
                    <TableCell className="max-w-sm">
                      <p className="truncate">{report.messageContent}</p>
                    </TableCell>
                     <TableCell>
                      <Badge variant="secondary">{report.reason}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" title="Ban User" onClick={() => handleBanUser(report.senderRole)}>
                            <UserX className="w-4 h-4 text-destructive"/>
                       </Button>
                       <Button variant="ghost" size="icon" title="Mark as Resolved" onClick={() => handleResolve(report.id)}>
                            <Check className="w-4 h-4 text-green-500"/>
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No active reports.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
