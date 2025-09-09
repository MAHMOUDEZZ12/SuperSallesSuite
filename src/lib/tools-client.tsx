
'use client';

import React from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Bot,
  FileUp,
  LayoutTemplate,
  Palette,
  Target,
  Share2,
  Sparkles,
  Clock,
  Briefcase,
  PenTool,
  MessageCircle,
  Mail,
  Wallet,
  MapPin,
  ClipboardList,
  FilePlus,
  Network,
  Building,
  Video,
  FileText,
  Search,
  Contact,
  UserPlus,
  Film,
  UserCog,
  Database,
  Clapperboard,
  Link as LinkIcon,
  Users2,
  Clock2,
  BadgeCheck,
  Phone,
  Upload,
  Copy,
  Download,
  Binoculars,
  LineChart,
  BrainCircuit,
  Wrench,
  Key,
  Facebook,
  Instagram,
  BarChart,
  Hash,
  Star,
  Loader2,
  ArrowLeft,
  Crown,
  TrendingUp,
  CheckCircle,
  Percent,
  Calendar,
  Languages,
  Youtube,
  Terminal,
  Edit,
  Server,
  Globe,
  UserCheck,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CodeBlock } from '@/components/code-block';
import { tools, type Feature, type Field, type FilterCategory } from '@/lib/features';

export { type Feature, type Field, type FilterCategory, tools };


export const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const filesToDataUris = (files: FileList | null): Promise<string[]> => {
    if (!files) return Promise.resolve([]);
    return Promise.all(Array.from(files).map(fileToDataUri));
};
