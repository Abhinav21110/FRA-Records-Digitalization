import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Award,
  Users2,
  Heart,
  CheckCircle2
} from "lucide-react";
import { 
  LineChart as RechartsLine, 
  Line, 
  BarChart as RechartsBar, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ScrollAnimatedSection } from "../components/UI/ScrollAnimatedSection";
import { AnimatedCounter } from "../components/UI/AnimatedCounter";
import { Button } from "../components/UI/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/UI/chart";

export const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("quarterly");

  const kpiMetrics = [
    {
      title: "Policy Impact Score",
      value: 87.4,
      change: 12.3,
      trend: "up",
      icon: Target,
      color: "text-primary-glow",
      gradient: "from-primary to-primary-glow"
    },
    {
      title: "Implementation Rate",
      value: 94.2,
      change: 8.7,
      trend: "up", 
      icon: CheckCircle2,
      color: "text-success",
      gradient: "from-success to-tertiary"
    },
    {
      title: "Beneficiary Satisfaction",
      value: 91.8,
      change: -2.1,
      trend: "down",
      icon: Heart,
      color: "text-info",
      gradient: "from-info to-secondary"
    },
    {
      title: "Resource Efficiency",
      value: 76.5,
      change: 15.2,
      trend: "up",
      icon: Zap,
      color: "text-warning",
      gradient: "from-warning to-accent"
    },
    {
      title: "User Engagement",
      value: 89.3,
      change: 6.8,
      trend: "up",
      icon: Users2,
      color: "text-tertiary",
      gradient: "from-tertiary to-success"
    },
    {
      title: "System Performance",
      value: 95.7,
      change: 4.2,
      trend: "up",
      icon: Award,
      color: "text-accent",
      gradient: "from-accent to-accent-glow"
    }
  ];

  const chartData = [
    { month: "Jan", pmkisan: 2400, water: 1800, infrastructure: 1200 },
    { month: "Feb", pmkisan: 1398, water: 2200, infrastructure: 1400 },
    { month: "Mar", pmkisan: 9800, water: 2800, infrastructure: 1800 },
    { month: "Apr", pmkisan: 3908, water: 2600, infrastructure: 2200 },
    { month: "May", pmkisan: 4800, water: 3200, infrastructure: 2800 },
    { month: "Jun", pmkisan: 3800, water: 2900, infrastructure: 2400 },
  ];

  const chartConfig = {
    pmkisan: { label: "PM-KISAN", color: "hsl(var(--success))" },
    water: { label: "Water Resources", color: "hsl(var(--info))" },
    infrastructure: { label: "Infrastructure", color: "hsl(var(--warning))" }
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
          Decision Support Dashboard
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Advanced Analytics & Predictive Insights for Policy Decision Making
        </motion.p>
      </ScrollAnimatedSection>

      {/* KPI Metrics - Enhanced Grid */}
      <ScrollAnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              className={`glass-container p-6 rounded-2xl hover:shadow-glass-hover transition-all duration-300 bg-gradient-to-br ${metric.gradient}`}
              initial={{ y: 60, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`p-3 rounded-xl bg-slate-900 ${metric.color}`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <metric.icon className="h-6 w-6 text-white" />
                </motion.div>
                <motion.div 
                  className={`flex items-center space-x-1 ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {metric.trend === 'up' ? 
                    <TrendingUp className="h-4 w-4" /> : 
                    <TrendingDown className="h-4 w-4" />
                  }
                  <span className="text-sm font-medium">
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </motion.div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <div className="text-3xl font-bold">
                  <AnimatedCounter
                    value={metric.value}
                    suffix="%"
                    duration={2}
                    decimals={1}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollAnimatedSection>

      {/* Predictive Analytics Score */}
      <ScrollAnimatedSection className="glass-container p-8 rounded-2xl" delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Policy Impact & Predictive Success Score</h2>
              <p className="text-muted-foreground">
                AI-driven analysis of policy effectiveness and predicted outcomes for targeted interventions
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Implementation Probability</span>
                <span className="text-2xl font-bold text-success">94.2%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-success to-primary-glow h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "94.2%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Resource Optimization</span>
                <span className="text-2xl font-bold text-info">87.8%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-info to-accent h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "87.8%" }}
                  transition={{ duration: 2, delay: 0.7 }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <motion.div
              className="relative w-64 h-64"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
              <motion.div
                className="absolute inset-0 rounded-full border-8 border-gradient-flow border-r-transparent border-b-transparent"
                style={{ 
                  background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--primary-glow)), hsl(var(--success)), hsl(var(--primary)))",
                  borderRadius: "50%",
                  mask: "conic-gradient(from 0deg, black 0deg, black 310deg, transparent 310deg)"
                }}
                initial={{ rotate: -90 }}
                animate={{ rotate: 220 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <div className="absolute inset-8 rounded-full glass-container flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">
                    <AnimatedCounter value={86.4} suffix="%" decimals={1} duration={2} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Overall Score</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollAnimatedSection>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <ScrollAnimatedSection className="glass-container p-6 rounded-2xl" delay={0.3}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <LineChart className="h-5 w-5 text-primary-glow" />
              <h3 className="text-lg font-semibold">Scheme Performance Trends</h3>
            </div>
            <div className="flex space-x-2">
              {["monthly", "quarterly", "yearly"].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="capitalize"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
          
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLine data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="pmkisan" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  strokeDasharray="0"
                  dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="water" 
                  stroke="hsl(var(--info))" 
                  strokeWidth={3}
                  strokeDasharray="0"
                  dot={{ fill: "hsl(var(--info))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="infrastructure" 
                  stroke="hsl(var(--warning))" 
                  strokeWidth={3}
                  strokeDasharray="0"
                  dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
                />
              </RechartsLine>
            </ResponsiveContainer>
          </ChartContainer>
        </ScrollAnimatedSection>

        {/* Bar Chart */}
        <ScrollAnimatedSection className="glass-container p-6 rounded-2xl" delay={0.4}>
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-semibold">Resource Allocation</h3>
          </div>
          
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBar data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="pmkisan" 
                  fill="hsl(var(--success))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="water" 
                  fill="hsl(var(--info))" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="infrastructure" 
                  fill="hsl(var(--warning))" 
                  radius={[4, 4, 0, 0]}
                />
              </RechartsBar>
            </ResponsiveContainer>
          </ChartContainer>
        </ScrollAnimatedSection>
      </div>

      {/* Scheme Recommendations */}
      <ScrollAnimatedSection className="glass-container p-8 rounded-2xl" delay={0.5}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="text-2xl font-bold">Priority Scheme Recommendations</h2>
          </div>
          <Button variant="outline">
            View All Recommendations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Water Resource Enhancement",
              priority: "High",
              impact: "94%",
              region: "Rajasthan, Gujarat",
              timeline: "Q2 2024"
            },
            {
              title: "Digital Infrastructure Expansion", 
              priority: "Medium",
              impact: "87%",
              region: "Northeast States",
              timeline: "Q3 2024"
            },
            {
              title: "PM-KISAN Eligibility Review",
              priority: "High", 
              impact: "91%",
              region: "UP, Bihar, West Bengal",
              timeline: "Q1 2024"
            }
          ].map((scheme, index) => (
            <motion.div
              key={scheme.title}
              className="glass-container p-6 rounded-xl hover:shadow-glass-hover transition-all duration-300 bg-gradient-to-br from-glass-primary to-glass-secondary"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{scheme.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    scheme.priority === "High" 
                      ? "bg-destructive/20 text-destructive" 
                      : "bg-warning/20 text-warning"
                  }`}>
                    {scheme.priority}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Expected Impact</p>
                    <p className="font-semibold text-success">{scheme.impact}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Timeline</p>
                    <p className="font-semibold">{scheme.timeline}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Target Region</p>
                  <p className="font-medium">{scheme.region}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollAnimatedSection>
    </div>
  );
};