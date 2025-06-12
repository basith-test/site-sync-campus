
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Calendar, Users, BookOpen, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [websiteStatus] = useState("Published");

  const stats = [
    { label: "Page Views", value: "2,847", icon: TrendingUp, change: "+12%" },
    { label: "Total Pages", value: "8", icon: BookOpen, change: "Recently updated" },
    { label: "Last Updated", value: "2 hours ago", icon: Calendar, change: "Auto-synced" },
    { label: "Active Users", value: "156", icon: Users, change: "+8%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Campus Web Builder</h1>
              <p className="text-sm text-slate-600">Springfield University</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={websiteStatus === "Published" ? "default" : "secondary"}>
              {websiteStatus}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Website Management Dashboard
          </h2>
          <p className="text-lg text-slate-600">
            Manage your campus website with ease. No technical expertise required.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">View Website</CardTitle>
                  <CardDescription>
                    See your live website as visitors see it
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                size="lg"
                onClick={() => navigate("/preview")}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Live Site
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Edit className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Edit Website</CardTitle>
                  <CardDescription>
                    Customize your website with our visual editor
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700" 
                size="lg"
                onClick={() => navigate("/editor")}
              >
                <Edit className="w-4 h-4 mr-2" />
                Open Editor
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-slate-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest updates and changes to your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Updated faculty list", time: "2 hours ago", type: "auto" },
                { action: "New announcement published", time: "5 hours ago", type: "auto" },
                { action: "Homepage banner edited", time: "1 day ago", type: "manual" },
                { action: "Course catalog synchronized", time: "2 days ago", type: "auto" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${activity.type === 'auto' ? 'bg-green-500' : 'bg-blue-500'}`} />
                    <span className="text-sm text-slate-700">{activity.action}</span>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
