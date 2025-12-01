'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  setEmployees,
  setTasks,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  deleteSelectedEmployees,
  closeModal,
  openModal,
  setSidebarOpen,
} from '@/redux/slices/dashboardSlice';
import { DashboardMainPage } from '@/components/dashboard/pages/DashboardMainPage';
import { EmployeeListPage } from '@/components/dashboard/pages/EmployeeListPage';
import { DeleteModal } from '@/components/dashboard/ui/Modal';
import { AddEmployeeSidebar, EditEmployeeSidebar } from '@/components/dashboard/forms/EmployeeForm';
import { WidgetSidebar, CustomizationPanel } from '@/components/dashboard/panels/WidgetPanel';
import type { Employee } from '@/types/dashboard';
import { generateMockEmployees } from '@/mocks/employees';
import { generateMockTasks } from '@/mocks/tasks';

type DashboardView = 'main' | 'list' | 'add' | 'edit';

export const DashboardContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { modalOpen, selectedEmployee, selectedEmployees, sidebarOpen, employees, tasks } = useAppSelector(
    (state) => state.dashboard
  );
  
  // Get view from URL or default to 'main'
  const viewFromUrl = searchParams.get('view') as DashboardView | null;
  const isValidView = viewFromUrl && ['main', 'list'].includes(viewFromUrl);
  const [currentView, setCurrentView] = useState<DashboardView>(isValidView ? viewFromUrl : 'main');

  // Sync URL with currentView when URL changes
  useEffect(() => {
    const currentViewFromUrl = searchParams.get('view') as DashboardView | null;
    if (currentViewFromUrl && ['main', 'list'].includes(currentViewFromUrl) && currentViewFromUrl !== currentView) {
      setCurrentView(currentViewFromUrl);
    }
  }, [searchParams, currentView]);

  // Update URL when view changes
  const handleViewChange = (view: DashboardView) => {
    setCurrentView(view);
    const params = new URLSearchParams();
    params.set('view', view);
    router.push(`/dashboard?${params.toString()}`, { scroll: false });
  };
  const [showWidgetSidebar, setShowWidgetSidebar] = useState(false);
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [panelOrder, setPanelOrder] = useState<string[]>(['appointments', 'search', 'menu', 'statistics']);
  const [hiddenPanels, setHiddenPanels] = useState<string[]>([]);
  const [draggedPanelId, setDraggedPanelId] = useState<string | null>(null);
  const [previewOrder, setPreviewOrder] = useState<string[] | null>(null);

  // Load customization from localStorage
  useEffect(() => {
    const savedOrder = localStorage.getItem('dashboard-panel-order');
    const savedHidden = localStorage.getItem('dashboard-hidden-panels');
    
    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);
      // Migrate from quickActions to search and menu
      const migratedOrder = parsedOrder.flatMap((id: string) => {
        if (id === 'quickActions') {
          return ['search', 'menu'];
        }
        return [id];
      });
      setPanelOrder(migratedOrder);
      // Update localStorage with migrated order if changed
      if (JSON.stringify(parsedOrder) !== JSON.stringify(migratedOrder)) {
        localStorage.setItem('dashboard-panel-order', JSON.stringify(migratedOrder));
      }
    }
    if (savedHidden) {
      const parsedHidden = JSON.parse(savedHidden);
      // Migrate hidden panels from quickActions to search and menu
      const migratedHidden = parsedHidden.flatMap((id: string) => {
        if (id === 'quickActions') {
          return ['search', 'menu'];
        }
        return [id];
      });
      setHiddenPanels(migratedHidden);
      // Update localStorage with migrated hidden panels if changed
      if (JSON.stringify(parsedHidden) !== JSON.stringify(migratedHidden)) {
        localStorage.setItem('dashboard-hidden-panels', JSON.stringify(migratedHidden));
      }
    }
  }, []);

  // Initialize with mock data only if localStorage is empty
  useEffect(() => {
    // Check if employees exist in Redux state (loaded from localStorage)
    const currentEmployees = employees;
    
    // Only set mock data if no employees exist
    if (currentEmployees.length === 0) {
      dispatch(setEmployees(generateMockEmployees()));
    }

    // Check if tasks exist in Redux state (loaded from localStorage)
    const currentTasks = tasks;
    
    // Only set mock data if no tasks exist
    if (currentTasks.length === 0) {
      dispatch(setTasks(generateMockTasks()));
    }
  }, [dispatch, employees, tasks]);

  const handleStartCustomization = () => {
    setIsCustomizing(true);
  };

  const handleConfirmCustomization = () => {
    localStorage.setItem('dashboard-panel-order', JSON.stringify(panelOrder));
    localStorage.setItem('dashboard-hidden-panels', JSON.stringify(hiddenPanels));
    setIsCustomizing(false);
  };

  const handleCancelCustomization = () => {
    const savedOrder = localStorage.getItem('dashboard-panel-order');
    const savedHidden = localStorage.getItem('dashboard-hidden-panels');
    
    if (savedOrder) {
      setPanelOrder(JSON.parse(savedOrder));
    } else {
      setPanelOrder(['appointments', 'search', 'menu', 'statistics']);
    }
    
    if (savedHidden) {
      setHiddenPanels(JSON.parse(savedHidden));
    } else {
      setHiddenPanels([]);
    }
    
    setDraggedPanelId(null);
    setPreviewOrder(null);
    setIsCustomizing(false);
  };

  const handleDragStart = (id: string) => {
    setDraggedPanelId(id);
    setPreviewOrder([...panelOrder]);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedPanelId || draggedPanelId === targetId || !previewOrder) return;

    const currentOrder = [...previewOrder];
    const draggedIndex = currentOrder.indexOf(draggedPanelId);
    const targetIndex = currentOrder.indexOf(targetId);

    if (draggedIndex === targetIndex) return;

    // جابجایی real-time
    currentOrder.splice(draggedIndex, 1);
    currentOrder.splice(targetIndex, 0, draggedPanelId);

    setPreviewOrder(currentOrder);
  };

  const handleDragEnd = () => {
    if (previewOrder) {
      setPanelOrder(previewOrder);
    }
    setDraggedPanelId(null);
    setPreviewOrder(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    handleDragEnd();
  };

  const handleHidePanel = (id: string) => {
    setHiddenPanels([...hiddenPanels, id]);
    // حذف از panelOrder تا دوباره در sidebar ظاهر شود
    const newOrder = panelOrder.filter(panelId => panelId !== id);
    setPanelOrder(newOrder);
    localStorage.setItem('dashboard-panel-order', JSON.stringify(newOrder));
  };

  const handleAddWidget = (widgetId: string) => {
    // اضافه کردن ویجت جدید به لیست panelOrder
    if (!panelOrder.includes(widgetId)) {
      const newOrder = [...panelOrder, widgetId];
      setPanelOrder(newOrder);
      localStorage.setItem('dashboard-panel-order', JSON.stringify(newOrder));
    }
  };

  const handleDropWidget = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    const widgetId = e.dataTransfer.getData('widgetId');
    const source = e.dataTransfer.getData('source');
    
    if (widgetId && source === 'sidebar' && !panelOrder.includes(widgetId)) {
      const newOrder = [...panelOrder];
      // محدود کردن position به محدوده معتبر
      const validPosition = Math.min(Math.max(0, position), newOrder.length);
      newOrder.splice(validPosition, 0, widgetId);
      setPanelOrder(newOrder);
      localStorage.setItem('dashboard-panel-order', JSON.stringify(newOrder));
    }
  };

  const handleMoveWidget = (widgetId: string, newPosition: number) => {
    const newOrder = [...panelOrder];
    const draggedIndex = newOrder.indexOf(widgetId);
    if (draggedIndex !== -1) {
      newOrder.splice(draggedIndex, 1);
      // محدود کردن position به محدوده معتبر
      const validPosition = Math.min(Math.max(0, newPosition), newOrder.length);
      newOrder.splice(validPosition, 0, widgetId);
      setPanelOrder(newOrder);
      localStorage.setItem('dashboard-panel-order', JSON.stringify(newOrder));
    }
  };

  const handleAddEmployee = (data: any) => {
    dispatch(addEmployee(data));
    dispatch(closeModal('add'));
  };

  const handleEditEmployee = (data: any) => {
    dispatch(updateEmployee(data));
    dispatch(closeModal('edit'));
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      dispatch(deleteEmployee(selectedEmployee.id));
    } else if (selectedEmployees.length > 0) {
      dispatch(deleteSelectedEmployees());
    }
    dispatch(closeModal('delete'));
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-3 sm:py-4 sticky top-0 z-30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <h1 className="text-lg sm:text-xl font-bold text-cyan-600">
              پنل مدیریت
            </h1>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleViewChange('main')}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors flex-1 sm:flex-none ${
                  currentView === 'main'
                    ? 'bg-cyan-500 text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                داشبورد
              </button>
              <button
                onClick={() => handleViewChange('list')}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors flex-1 sm:flex-none ${
                  currentView === 'list'
                    ? 'bg-cyan-500 text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                لیست کاربران
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShowWidgetSidebar(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="افزودن ویجت"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            {!isCustomizing ? (
              <button
                onClick={handleStartCustomization}
                className="px-2 sm:px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 sm:gap-2"
                title="شخصی‌سازی"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline">
                  شخصی سازی
                </span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleConfirmCustomization}
                  className="px-2 sm:px-4 py-2 rounded-lg transition-colors flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm bg-cyan-500 hover:bg-cyan-600"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-bold hidden sm:inline">تایید شخصی سازی</span>
                  <span className="font-bold sm:hidden">تایید</span>
                </button>
                <button
                  onClick={handleCancelCustomization}
                  className="px-2 sm:px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors text-gray-700 border border-gray-300 text-xs sm:text-sm"
                >
                  لغو
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div>
        {currentView === 'main' && (
          <DashboardMainPage
            isCustomizing={isCustomizing}
            panelOrder={previewOrder || panelOrder}
            hiddenPanels={hiddenPanels}
            draggedPanelId={draggedPanelId}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
            onDropWidget={handleDropWidget}
            onMoveWidget={handleMoveWidget}
            onHidePanel={handleHidePanel}
          />
        )}
        {currentView === 'list' && <EmployeeListPage />}
      </div>

      {/* Modals and Sidebars */}
      <DeleteModal
        isOpen={modalOpen.delete}
        onClose={() => dispatch(closeModal('delete'))}
        onConfirm={handleDeleteEmployee}
        title="حذف آیتم"
        message={
          selectedEmployees.length > 1
            ? `آیا مطمئن هستید که می‌خواهید ${selectedEmployees.length} آیتم را حذف کنید؟`
            : 'پیش از حذف آیتم، باید به این نکته توجه داشته باشید'
        }
      />

      <AddEmployeeSidebar
        isOpen={modalOpen.add}
        onClose={() => dispatch(closeModal('add'))}
        onSave={handleAddEmployee}
      />

      <EditEmployeeSidebar
        isOpen={modalOpen.edit}
        onClose={() => dispatch(closeModal('edit'))}
        onSave={handleEditEmployee}
        employee={selectedEmployee}
      />

      <WidgetSidebar 
        isOpen={showWidgetSidebar} 
        onClose={() => setShowWidgetSidebar(false)}
        existingWidgets={panelOrder}
        onAddWidget={handleAddWidget}
      />

      <CustomizationPanel isOpen={showCustomizationPanel} onClose={() => setShowCustomizationPanel(false)} />

    </div>
  );
};

