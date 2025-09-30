import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Archive, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  User,
  FileText,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal
} from "lucide-react";
import { ScrollAnimatedSection } from "../components/UI/ScrollAnimatedSection";
import { Button } from "../components/UI/button";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";

export const ArchivePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  const timelineEvents = [
    { 
      id: 1, 
      date: "2024-01-15", 
      title: "PM-KISAN Database Migration",
      status: "completed",
      description: "Successfully migrated 15.2M beneficiary records"
    },
    { 
      id: 2, 
      date: "2024-02-03", 
      title: "Water Resource Data Integration",
      status: "in-progress",
      description: "Integrating state-wise water availability data"
    },
    { 
      id: 3, 
      date: "2024-02-20", 
      title: "Digital Infrastructure Assessment",
      status: "pending",
      description: "Comprehensive digital readiness evaluation"
    },
    { 
      id: 4, 
      date: "2024-03-10", 
      title: "Policy Impact Analysis",
      status: "completed",
      description: "Q1 2024 policy effectiveness report generated"
    }
  ];

  const archiveRecords = [
    {
      id: "CLM-2024-001542",
      title: "PM-KISAN Beneficiary Verification - UP",
      type: "Claim Verification",
      status: "verified",
      submittedBy: "District Collector, Lucknow",
      submittedDate: "2024-01-15",
      lastUpdated: "2024-01-20",
      priority: "high",
      recordCount: "15,847"
    },
    {
      id: "CLM-2024-001543", 
      title: "Water Rights Documentation - Rajasthan",
      type: "Documentation",
      status: "under-review",
      submittedBy: "Water Resources Dept.",
      submittedDate: "2024-01-18",
      lastUpdated: "2024-01-25",
      priority: "medium",
      recordCount: "8,234"
    },
    {
      id: "CLM-2024-001544",
      title: "Infrastructure Development Claims",
      type: "Infrastructure",
      status: "pending",
      submittedBy: "Rural Development Ministry",
      submittedDate: "2024-01-22",
      lastUpdated: "2024-01-28",
      priority: "low",
      recordCount: "3,156"
    },
    {
      id: "CLM-2024-001545",
      title: "Digital Literacy Program Assessment",
      type: "Assessment",
      status: "verified",
      submittedBy: "Education Department",
      submittedDate: "2024-01-25",
      lastUpdated: "2024-02-01",
      priority: "high",
      recordCount: "12,489"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "verified":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "in-progress":
      case "under-review":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "pending":
        return <Clock className="h-4 w-4 text-info" />;
      default:
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const filteredRecords = archiveRecords.filter(record => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      record.id.toLowerCase().includes(searchTermLower) ||
      record.title.toLowerCase().includes(searchTermLower) ||
      record.submittedBy.toLowerCase().includes(searchTermLower);

    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus;

    let matchesPeriod = true;
    if (selectedPeriod !== 'all') {
      const recordDate = new Date(record.submittedDate);
      const now = new Date();
      if (selectedPeriod === 'last-week') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesPeriod = recordDate >= weekAgo;
      } else if (selectedPeriod === 'last-month') {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        matchesPeriod = recordDate >= monthAgo;
      } else if (selectedPeriod === 'last-quarter') {
        const quarterAgo = new Date();
        quarterAgo.setMonth(now.getMonth() - 3);
        matchesPeriod = recordDate >= quarterAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/20 text-destructive";
      case "medium": 
        return "bg-warning/20 text-warning";
      case "low":
        return "bg-success/20 text-success";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <ScrollAnimatedSection className="text-center space-y-4">
        <motion.h1 
          className="text-4xl font-bold text-glass-glow"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          Digitization Archive
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Comprehensive Record Management & Historical Data Analysis
        </motion.p>
      </ScrollAnimatedSection>

      {/* Search & Filters */}
      <ScrollAnimatedSection className="glass-container p-6 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by claim ID, title, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-container border-glass"
              />
            </div>
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="glass-container border-glass">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="glass-container border-glass">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="glass-container border-glass">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent className="glass-container border-glass">
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last-week">Last Week</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ScrollAnimatedSection>

      {/* Interactive Timeline */}
      <ScrollAnimatedSection className="glass-container p-8 rounded-2xl" delay={0.2}>
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="h-5 w-5 text-primary-glow" />
          <h2 className="text-2xl font-bold">Digitization Timeline</h2>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent"></div>
          
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="relative flex items-start space-x-6"
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="relative z-10 glass-container p-2 rounded-full"
                  whileHover={{ scale: 1.2 }}
                >
                  {getStatusIcon(event.status)}
                </motion.div>
                
                {/* Event Content */}
                <motion.div
                  className="flex-1 glass-container p-6 rounded-xl hover:shadow-glass-hover transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                  <div className="mt-3 flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === "completed" ? "bg-success/20 text-success" :
                      event.status === "in-progress" ? "bg-warning/20 text-warning" :
                      "bg-info/20 text-info"
                    }`}>
                      {event.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollAnimatedSection>

      {/* Records Table */}
      <ScrollAnimatedSection className="glass-container p-6 rounded-2xl" delay={0.3}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-secondary" />
            <h2 className="text-2xl font-bold">Record History</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="glass-container">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm" className="glass-container">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-glass">
                <TableHead className="text-muted-foreground">Claim ID</TableHead>
                <TableHead className="text-muted-foreground">Title & Type</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Submitted By</TableHead>
                <TableHead className="text-muted-foreground">Records</TableHead>
                <TableHead className="text-muted-foreground">Last Updated</TableHead>
                <TableHead className="text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false}>
                {filteredRecords.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    className="border-glass hover:bg-glass-highlight/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell className="font-mono text-sm">{record.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{record.title}</p>
                        <p className="text-sm text-muted-foreground">{record.type}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(record.status)}
                        <span className="capitalize">{record.status.replace("-", " ")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{record.submittedBy}</p>
                        <p className="text-xs text-muted-foreground">{record.submittedDate}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(record.priority)}`}>
                        {record.recordCount}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </ScrollAnimatedSection>

      {/* Print Report Section */}
      <ScrollAnimatedSection className="glass-container p-8 rounded-2xl text-center" delay={0.4}>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Generate Comprehensive Report</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Create a detailed, print-optimized summary of digitization progress and archive status
          </p>
          <Button variant="outline" size="lg" className="mt-4 glass-container">
            <FileText className="h-5 w-5 mr-2" />
            Generate Print Report
          </Button>
        </div>
      </ScrollAnimatedSection>
    </div>
  );
};